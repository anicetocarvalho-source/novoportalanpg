import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Crown, ArrowRight, Shield } from "lucide-react";
import { boardMembers, supervisionBodies } from "@/data/boardData";

function MemberCard({
  member,
  index,
  isPCA = false,
}: {
  member: (typeof boardMembers)[0];
  index: number;
  isPCA?: boolean;
}) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: isPCA ? 0 : 0.15 + index * 0.1 }}
      onClick={() => navigate(`/about/board/${member.slug}`)}
      className={`group relative text-left w-full cursor-pointer ${
        isPCA ? "max-w-sm mx-auto" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
          isPCA
            ? "bg-gradient-to-br from-primary/10 via-card to-primary/5 border-primary/30 shadow-elevated hover:shadow-modal hover:-translate-y-2"
            : "bg-card border-border/50 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-primary/20"
        }`}
      >
        {/* Shine sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>

        <div className={`p-6 ${isPCA ? "p-8" : ""}`}>
          {/* Photo Avatar */}
          <div className="flex items-start gap-4">
            <div
              className={`relative flex-shrink-0 rounded-full overflow-hidden ${
                isPCA
                  ? "w-20 h-20 ring-3 ring-primary/30 shadow-lg"
                  : "w-16 h-16 ring-2 ring-border/50 group-hover:ring-primary/30 transition-all duration-300"
              }`}
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              {isPCA && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md z-10">
                  <Crown className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-bold text-foreground leading-tight ${
                  isPCA ? "text-xl" : "text-lg"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`mt-1 text-muted-foreground ${
                  isPCA ? "text-sm" : "text-xs"
                }`}
              >
                {isEn ? member.roleEn : member.role}
              </p>
            </div>
          </div>

          {/* Departments preview */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {member.departments.slice(0, 3).map((dept) => (
              <span
                key={dept.acronym}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary/80 text-xs font-medium text-muted-foreground"
              >
                {dept.acronym}
              </span>
            ))}
            {member.departments.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary/80 text-xs font-medium text-muted-foreground">
                +{member.departments.length - 3}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>{isEn ? "View profile" : "Ver perfil"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/** Animated vertical line segment */
function VLine({
  height,
  delay = 0,
  gradient = false,
}: {
  height: string;
  delay?: number;
  gradient?: boolean;
}) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`w-px origin-top mx-auto ${
        gradient
          ? "bg-gradient-to-b from-primary/40 to-border/60"
          : "bg-border/60"
      }`}
      style={{ height }}
    />
  );
}

/** The horizontal "T" connector that branches out to each admin column */
function TreeConnector({ columnCount }: { columnCount: number }) {
  return (
    <div className="relative hidden lg:block">
      {/* Main horizontal bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="h-px bg-border/60 mx-auto"
        style={{
          width: `calc(100% - ${100 / columnCount}%)`,
          marginLeft: `${100 / (columnCount * 2)}%`,
          marginRight: `${100 / (columnCount * 2)}%`,
        }}
      />
      {/* Vertical drops from bar to each card */}
      <div
        className="flex justify-between"
        style={{
          paddingLeft: `${100 / (columnCount * 2)}%`,
          paddingRight: `${100 / (columnCount * 2)}%`,
        }}
      >
        {Array.from({ length: columnCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
            className="w-px h-6 bg-border/60 origin-top"
          />
        ))}
      </div>
    </div>
  );
}

/** Mobile vertical connector (single line) */
function MobileConnector() {
  return (
    <div className="lg:hidden flex justify-center">
      <VLine height="2rem" delay={0.6} />
    </div>
  );
}

export function BoardOrgChart() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const pca = boardMembers.find((m) => m.isPCA)!;
  const admins = boardMembers.filter((m) => !m.isPCA);

  return (
    <div className="space-y-0">
      {/* ── PCA ── */}
      <div className="flex flex-col items-center">
        <MemberCard member={pca} index={0} isPCA />
      </div>

      {/* Vertical line PCA → Supervision */}
      <VLine height="2.5rem" delay={0.25} gradient />

      {/* Supervision bodies */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        {supervisionBodies.map((body) => (
          <div
            key={body.name}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary/60 border border-border/50"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {isEn ? body.nameEn : body.name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Vertical line Supervision → Tree connector */}
      <VLine height="2.5rem" delay={0.5} />

      {/* Tree connector (desktop) / single line (mobile) */}
      <TreeConnector columnCount={admins.length} />
      <MobileConnector />

      {/* ── Administrators ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {admins.map((member, index) => (
          <MemberCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </div>
  );
}
