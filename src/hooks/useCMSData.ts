import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

// ─── FAQ Items ───
export function useFAQItems() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return useQuery({
    queryKey: ["faq_items", isEn],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faq_items")
        .select("*")
        .eq("is_active", true)
        .order("category")
        .order("sort_order");

      if (error) throw error;
      return data;
    },
    select: (data) => {
      // Group by category
      const grouped = data.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push({
          question: isEn ? (item.question_en || item.question_pt) : item.question_pt,
          answer: isEn ? (item.answer_en || item.answer_pt) : item.answer_pt,
        });
        return acc;
      }, {} as Record<string, { question: string; answer: string }[]>);
      return grouped;
    },
  });
}

// ─── History Events ───
export function useHistoryEvents() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return useQuery({
    queryKey: ["history_events", isEn],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("history_events")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (error) throw error;
      return data;
    },
    select: (data) =>
      data.map((e) => ({
        id: e.id,
        year: e.year.toString(),
        title: isEn ? (e.title_en || e.title_pt) : e.title_pt,
        description: isEn ? (e.description_en || e.description_pt || "") : (e.description_pt || ""),
        image: e.image_url || undefined,
      })),
  });
}

// ─── Board Members ───
export interface CMSBoardMember {
  id: string;
  slug: string;
  full_name: string;
  title: string;
  role: string | null;
  bio: string | null;
  message: string | null;
  photo_url: string | null;
  email: string | null;
  phone: string | null;
  office_location: string | null;
  group_key: string;
  sort_order: number;
  is_active: boolean;
}

export function useBoardMembers() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return useQuery({
    queryKey: ["board_members", isEn],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("board_members")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (error) throw error;
      return data;
    },
    select: (data) =>
      data.map((m) => ({
        id: m.id,
        slug: m.slug,
        full_name: m.full_name,
        title: isEn ? (m.title_en || m.title_pt) : m.title_pt,
        role: isEn ? (m.role_en || m.role_pt) : m.role_pt,
        bio: isEn ? (m.bio_en || m.bio_pt) : m.bio_pt,
        message: isEn ? (m.message_en || m.message_pt) : m.message_pt,
        photo_url: m.photo_url,
        email: m.email,
        phone: m.phone,
        office_location: m.office_location,
        group_key: m.group_key,
        sort_order: m.sort_order,
        is_active: m.is_active,
      } as CMSBoardMember)),
  });
}

export function useBoardMemberBySlug(slug: string | undefined) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return useQuery({
    queryKey: ["board_member", slug, isEn],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("board_members")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        slug: data.slug,
        full_name: data.full_name,
        title: isEn ? (data.title_en || data.title_pt) : data.title_pt,
        role: isEn ? (data.role_en || data.role_pt) : data.role_pt,
        bio: isEn ? (data.bio_en || data.bio_pt) : data.bio_pt,
        message: isEn ? (data.message_en || data.message_pt) : data.message_pt,
        photo_url: data.photo_url,
        email: data.email,
        phone: data.phone,
        office_location: data.office_location,
        group_key: data.group_key,
        sort_order: data.sort_order,
        is_active: data.is_active,
      } as CMSBoardMember;
    },
    enabled: !!slug,
  });
}

// ─── Page Banners ───
export interface CMSPageBanner {
  id: string;
  page_key: string;
  title: string | null;
  subtitle: string | null;
  image_url: string | null;
  overlay_opacity: number | null;
  is_active: boolean;
}

export function usePageBanner(pageKey: string | undefined) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return useQuery({
    queryKey: ["page_banner", pageKey, isEn],
    queryFn: async () => {
      if (!pageKey) return null;
      const { data, error } = await supabase
        .from("page_banners")
        .select("*")
        .eq("page_key", pageKey)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        page_key: data.page_key,
        title: isEn ? (data.title_en || data.title_pt) : data.title_pt,
        subtitle: isEn ? (data.subtitle_en || data.subtitle_pt) : data.subtitle_pt,
        image_url: data.image_url,
        overlay_opacity: data.overlay_opacity,
        is_active: data.is_active,
      } as CMSPageBanner;
    },
    enabled: !!pageKey,
  });
}

// ─── Content Blocks ───
export interface CMSContentBlock {
  id: string;
  page_key: string;
  section_key: string;
  content: Record<string, any>;
  sort_order: number;
  is_active: boolean;
}

export function useContentBlock(pageKey: string, sectionKey: string) {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "pt";

  return useQuery({
    queryKey: ["content_block", pageKey, sectionKey, lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_blocks")
        .select("*")
        .eq("page_key", pageKey)
        .eq("section_key", sectionKey)
        .eq("language", lang)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        page_key: data.page_key,
        section_key: data.section_key,
        content: data.content as Record<string, any>,
        sort_order: data.sort_order,
        is_active: data.is_active,
      } as CMSContentBlock;
    },
  });
}

export function useContentBlocks(pageKey: string) {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "pt";

  return useQuery({
    queryKey: ["content_blocks", pageKey, lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_blocks")
        .select("*")
        .eq("page_key", pageKey)
        .eq("language", lang)
        .eq("is_active", true)
        .order("sort_order");

      if (error) throw error;
      return data.map((d) => ({
        id: d.id,
        page_key: d.page_key,
        section_key: d.section_key,
        content: d.content as Record<string, any>,
        sort_order: d.sort_order,
        is_active: d.is_active,
      })) as CMSContentBlock[];
    },
  });
}

// ─── Menu Items ───
export interface CMSMenuItem {
  id: string;
  label: string;
  url: string | null;
  icon: string | null;
  sort_order: number;
  parent_id: string | null;
  children: CMSMenuItem[];
}

export function useMenuItems() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return useQuery({
    queryKey: ["menu_items", isEn],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_visible", true)
        .eq("menu_group", "main")
        .order("sort_order");

      if (error) throw error;
      return data;
    },
    select: (data) => {
      const items = data.map((item) => ({
        id: item.id,
        label: isEn ? (item.label_en || item.label_pt) : item.label_pt,
        url: item.url,
        icon: item.icon,
        sort_order: item.sort_order,
        parent_id: item.parent_id,
        children: [] as CMSMenuItem[],
      }));

      // Build tree
      const topLevel = items.filter((i) => !i.parent_id);
      topLevel.forEach((parent) => {
        parent.children = items
          .filter((i) => i.parent_id === parent.id)
          .sort((a, b) => a.sort_order - b.sort_order);
      });

      return topLevel.sort((a, b) => a.sort_order - b.sort_order);
    },
  });
}
