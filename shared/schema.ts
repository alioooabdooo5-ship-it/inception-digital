import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for local authentication  
export const users = pgTable("users", {
  id: integer("id").generatedByDefaultAsIdentity().primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  profileImageUrl: varchar("profile_image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  image: text("image"),
  icon: text("icon"),
  link: text("link"),
  category: text("category"),
  stats: text("stats"),
  gradient: text("gradient"),
  
  // Video & Media
  videoUrl: text("video_url"), // YouTube/Vimeo video URL
  videoThumbnail: text("video_thumbnail"), // Video thumbnail image
  
  // Value Proposition & Competitive Advantages
  valueProposition: text("value_proposition"), // Main value proposition
  competitiveAdvantages: jsonb("competitive_advantages"), // Array of unique advantages
  
  // Success Stories & Social Proof
  successStories: jsonb("success_stories"), // Array of success stories
  socialProof: jsonb("social_proof"), // Array of social proof elements
  
  // Guarantees & Trust Elements
  guarantees: jsonb("guarantees"), // Array of guarantees offered
  urgencyElements: jsonb("urgency_elements"), // Limited time offers, etc.
  
  // Portfolio/Case Studies
  portfolioItems: jsonb("portfolio_items"), // Array of portfolio examples
  
  // Features
  features: jsonb("features"), // Array of service features
  
  // Process Steps
  processSteps: jsonb("process_steps"), // Array of process steps
  
  // Client Testimonials
  testimonials: jsonb("testimonials"), // Array of client testimonials
  
  // Pricing & Packages
  packages: jsonb("packages"), // Service packages/pricing tiers
  
  // FAQ
  faqs: jsonb("faqs"), // Frequently asked questions
  
  // SEO Fields
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  canonicalUrl: text("canonical_url"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  seoScore: integer("seo_score").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Industries table
export const industries = pgTable("industries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  image: text("image"),
  icon: text("icon"),
  gradient: text("gradient"),
  bgGradient: text("bg_gradient"),
  results: jsonb("results"),
  services: jsonb("services"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  canonicalUrl: text("canonical_url"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  seoScore: integer("seo_score").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Books table
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  cover: text("cover"),
  price: text("price"),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position"),
  company: text("company"),
  image: text("image"),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Articles table
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category"),
  categoryName: text("category_name"),
  author: text("author"),
  date: timestamp("date").defaultNow(),
  readTime: text("read_time"),
  image: text("image"),
  featured: boolean("featured").default(false),
  views: integer("views").default(0),
  status: text("status").default("draft"), // draft, review, published
  tags: text("tags").array(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  urlSlug: text("url_slug").unique(),
  canonicalUrl: text("canonical_url"),
  robotsIndex: boolean("robots_index").default(true),
  robotsFollow: boolean("robots_follow").default(true),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),
  schemaType: text("schema_type").default("Article"),
  breadcrumbs: jsonb("breadcrumbs"),
  internalLinks: jsonb("internal_links"),
  externalLinks: jsonb("external_links"),
  altTexts: jsonb("alt_texts"),
  readingTime: integer("reading_time"),
  wordCount: integer("word_count"),
  h1Tag: text("h1_tag"),
  h2Tags: text("h2_tags").array(),
  h3Tags: text("h3_tags").array(),
  seoScore: integer("seo_score").default(0),
  
  // Advanced Schema and SEO fields
  authorName: text("author_name"),
  authorUrl: text("author_url"),
  publishDate: text("publish_date"),
  modifiedDate: text("modified_date"),
  faqs: jsonb("faqs"), // FAQ Schema
  relatedArticles: jsonb("related_articles"), // Related articles
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact forms table
export const contactForms = pgTable("contact_forms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").default("new"), // new, replied, archived
  priority: text("priority").default("medium"), // high, medium, low
  source: text("source").default("contact-form"), // contact-form, website, email
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Media files table
export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // image, document, video, audio
  size: text("size").notNull(),
  url: text("url").notNull(),
  dimensions: text("dimensions"),
  downloads: integer("downloads").default(0),
  description: text("description"),
  tags: jsonb("tags"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Settings table
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // general, social, seo
  key: text("key").notNull(),
  value: text("value").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Page Content table
export const pageContents = pgTable("page_contents", {
  id: serial("id").primaryKey(),
  page: text("page").notNull(), // home, contact, about
  title: text("title").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  sections: jsonb("sections").notNull(), // Array of page sections
  contactInfo: jsonb("contact_info"), // Contact information for contact page
  socialLinks: jsonb("social_links"), // Social media links
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schema types  
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type InsertService = typeof services.$inferInsert;
export type Service = typeof services.$inferSelect;

export type Industry = typeof industries.$inferSelect;
export type InsertIndustry = typeof industries.$inferInsert;

export type Book = typeof books.$inferSelect;
export type InsertBook = typeof books.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

export type ContactForm = typeof contactForms.$inferSelect;
export type InsertContactForm = typeof contactForms.$inferInsert;

export type MediaFile = typeof mediaFiles.$inferSelect;
export type InsertMediaFile = typeof mediaFiles.$inferInsert;

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

export type PageContent = typeof pageContents.$inferSelect;
export type InsertPageContent = typeof pageContents.$inferInsert;

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertIndustrySchema = createInsertSchema(industries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBookSchema = createInsertSchema(books).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactFormSchema = createInsertSchema(contactForms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMediaFileSchema = createInsertSchema(mediaFiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPageContentSchema = createInsertSchema(pageContents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
