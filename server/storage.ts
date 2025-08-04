import {
  users,
  services,
  industries,
  books,
  testimonials,
  articles,
  contactForms,
  mediaFiles,
  settings,
  pageContents,
  sessions,
  type User,
  type InsertUser,
  type Service,
  type InsertService,
  type Industry,
  type InsertIndustry,
  type Book,
  type InsertBook,
  type Testimonial,
  type InsertTestimonial,
  type Article,
  type InsertArticle,
  type ContactForm,
  type InsertContactForm,
  type MediaFile,
  type InsertMediaFile,
  type Setting,
  type InsertSetting,
  type PageContent,
  type InsertPageContent,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, not } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

// Interface for storage operations
export interface IStorage {
  // User operations  
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserPassword(id: number, password: string): Promise<void>;
  deleteUser(id: number): Promise<void>;
  
  // Session store
  sessionStore: session.Store;

  // Services operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;

  // Industries operations
  getIndustries(): Promise<Industry[]>;
  getIndustry(id: number): Promise<Industry | undefined>;
  createIndustry(industry: InsertIndustry): Promise<Industry>;
  updateIndustry(id: number, industry: Partial<InsertIndustry>): Promise<Industry>;
  deleteIndustry(id: number): Promise<void>;

  // Books operations
  getBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: Partial<InsertBook>): Promise<Book>;
  deleteBook(id: number): Promise<void>;

  // Testimonials operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;

  // Articles operations
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article>;
  deleteArticle(id: number): Promise<void>;

  // Contact forms operations
  getContactForms(): Promise<ContactForm[]>;
  getContactForm(id: number): Promise<ContactForm | undefined>;
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
  updateContactFormStatus(id: number, status: string): Promise<ContactForm>;
  deleteContactForm(id: number): Promise<void>;

  // Media files operations
  getMediaFiles(): Promise<MediaFile[]>;
  getMediaFile(id: number): Promise<MediaFile | undefined>;
  createMediaFile(mediaFile: InsertMediaFile): Promise<MediaFile>;
  updateMediaFile(id: number, mediaFile: Partial<InsertMediaFile>): Promise<MediaFile>;
  deleteMediaFile(id: number): Promise<void>;

  // Settings operations
  getSettings(): Promise<Setting[]>;
  getSetting(id: number): Promise<Setting | undefined>;
  getSettingByKey(key: string): Promise<Setting | undefined>;
  createSetting(setting: InsertSetting): Promise<Setting>;
  updateSetting(id: number, setting: Partial<InsertSetting>): Promise<Setting>;
  deleteSetting(id: number): Promise<void>;
  
  // Page Content operations
  getPageContent(page: string): Promise<PageContent | undefined>;
  upsertPageContent(pageContent: InsertPageContent): Promise<PageContent>;
  deletePageContent(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true 
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async updateUserPassword(id: number, password: string): Promise<void> {
    const { hashPassword } = await import('./auth');
    const hashedPassword = await hashPassword(password);
    await db.update(users).set({ password: hashedPassword, updatedAt: new Date() }).where(eq(users.id, id));
  }

  async deleteUser(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  // Services operations
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(desc(services.createdAt));
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const [updatedService] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Industries operations
  async getIndustries(): Promise<Industry[]> {
    return await db.select().from(industries).orderBy(desc(industries.createdAt));
  }

  async getIndustry(id: number): Promise<Industry | undefined> {
    const [industry] = await db.select().from(industries).where(eq(industries.id, id));
    return industry;
  }

  async createIndustry(industry: InsertIndustry): Promise<Industry> {
    const [newIndustry] = await db.insert(industries).values(industry).returning();
    return newIndustry;
  }

  async updateIndustry(id: number, industry: Partial<InsertIndustry>): Promise<Industry> {
    const [updatedIndustry] = await db
      .update(industries)
      .set({ ...industry, updatedAt: new Date() })
      .where(eq(industries.id, id))
      .returning();
    return updatedIndustry;
  }

  async deleteIndustry(id: number): Promise<void> {
    await db.delete(industries).where(eq(industries.id, id));
  }

  // Books operations
  async getBooks(): Promise<Book[]> {
    return await db.select().from(books).orderBy(desc(books.createdAt));
  }

  async getBook(id: number): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(eq(books.id, id));
    return book;
  }

  async createBook(book: InsertBook): Promise<Book> {
    const [newBook] = await db.insert(books).values(book).returning();
    return newBook;
  }

  async updateBook(id: number, book: Partial<InsertBook>): Promise<Book> {
    const [updatedBook] = await db
      .update(books)
      .set({ ...book, updatedAt: new Date() })
      .where(eq(books.id, id))
      .returning();
    return updatedBook;
  }

  async deleteBook(id: number): Promise<void> {
    await db.delete(books).where(eq(books.id, id));
  }

  // Testimonials operations
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Articles operations
  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles).orderBy(desc(articles.createdAt));
  }

  async getArticle(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(articles).values(article).returning();
    return newArticle;
  }

  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article> {
    const [updatedArticle] = await db
      .update(articles)
      .set({ ...article, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return updatedArticle;
  }

  async deleteArticle(id: number): Promise<void> {
    await db.delete(articles).where(eq(articles.id, id));
  }

  async checkSlugAvailability(slug: string, excludeId?: string): Promise<boolean> {
    if (!slug) return false;
    
    const conditions = [eq(articles.urlSlug, slug)];
    
    if (excludeId) {
      conditions.push(not(eq(articles.id, parseInt(excludeId))));
    }
    
    const existing = await db.select().from(articles).where(
      conditions.length === 1 ? conditions[0] : 
      conditions.reduce((acc, condition) => acc.and(condition))
    );
    
    return existing.length === 0;
  }

  // Contact forms operations
  async getContactForms(): Promise<ContactForm[]> {
    return await db.select().from(contactForms).orderBy(desc(contactForms.createdAt));
  }

  async getContactForm(id: number): Promise<ContactForm | undefined> {
    const [form] = await db.select().from(contactForms).where(eq(contactForms.id, id));
    return form;
  }

  async createContactForm(form: InsertContactForm): Promise<ContactForm> {
    const [newForm] = await db.insert(contactForms).values(form).returning();
    return newForm;
  }

  async updateContactFormStatus(id: number, status: string): Promise<ContactForm> {
    const [updatedForm] = await db
      .update(contactForms)
      .set({ status, updatedAt: new Date() })
      .where(eq(contactForms.id, id))
      .returning();
    return updatedForm;
  }

  async deleteContactForm(id: number): Promise<void> {
    await db.delete(contactForms).where(eq(contactForms.id, id));
  }

  // Media files operations
  async getMediaFiles(): Promise<MediaFile[]> {
    return await db.select().from(mediaFiles).orderBy(desc(mediaFiles.createdAt));
  }

  async getMediaFile(id: number): Promise<MediaFile | undefined> {
    const [file] = await db.select().from(mediaFiles).where(eq(mediaFiles.id, id));
    return file;
  }

  async createMediaFile(mediaFile: InsertMediaFile): Promise<MediaFile> {
    const [newFile] = await db.insert(mediaFiles).values(mediaFile).returning();
    return newFile;
  }

  async updateMediaFile(id: number, mediaFile: Partial<InsertMediaFile>): Promise<MediaFile> {
    const [updatedFile] = await db
      .update(mediaFiles)
      .set({ ...mediaFile, updatedAt: new Date() })
      .where(eq(mediaFiles.id, id))
      .returning();
    return updatedFile;
  }

  async deleteMediaFile(id: number): Promise<void> {
    await db.delete(mediaFiles).where(eq(mediaFiles.id, id));
  }

  // Settings operations
  async getSettings(): Promise<Setting[]> {
    return await db.select().from(settings).orderBy(desc(settings.createdAt));
  }

  async getSetting(id: number): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.id, id));
    return setting;
  }

  async getSettingByKey(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting;
  }

  async getSettingsByCategory(category: string): Promise<Setting[]> {
    return await db.select().from(settings).where(eq(settings.category, category));
  }

  async createSetting(setting: InsertSetting): Promise<Setting> {
    const [newSetting] = await db.insert(settings).values(setting).returning();
    return newSetting;
  }

  async updateSetting(id: number, setting: Partial<InsertSetting>): Promise<Setting> {
    const [updatedSetting] = await db
      .update(settings)
      .set({ ...setting, updatedAt: new Date() })
      .where(eq(settings.id, id))
      .returning();
    return updatedSetting;
  }

  async deleteSetting(id: number): Promise<void> {
    await db.delete(settings).where(eq(settings.id, id));
  }

  // Page Content operations
  async getPageContent(page: string): Promise<PageContent | undefined> {
    const [content] = await db.select().from(pageContents).where(eq(pageContents.page, page));
    return content;
  }

  async upsertPageContent(pageContent: InsertPageContent): Promise<PageContent> {
    const existing = await this.getPageContent(pageContent.page);
    
    if (existing) {
      // Update existing content
      const [updatedContent] = await db
        .update(pageContents)
        .set({ ...pageContent, updatedAt: new Date() })
        .where(eq(pageContents.page, pageContent.page))
        .returning();
      return updatedContent;
    } else {
      // Create new content
      const [newContent] = await db.insert(pageContents).values(pageContent).returning();
      return newContent;
    }
  }

  async deletePageContent(id: number): Promise<void> {
    await db.delete(pageContents).where(eq(pageContents.id, id));
  }
}

export const storage = new DatabaseStorage();
