import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, requireAuth } from "./auth";
import { 
  upload, 
  processImage, 
  processFile, 
  createThumbnail, 
  formatFileSize, 
  getFileType 
} from "./upload";
import { 
  insertServiceSchema,
  insertIndustrySchema,
  insertBookSchema,
  insertTestimonialSchema,
  insertArticleSchema,
  insertContactFormSchema,
  insertMediaFileSchema,
  insertSettingSchema,
  insertPageContentSchema
} from "@shared/schema";
import { seedDatabase } from "./seedData";

export function registerRoutes(app: Express): Server {
  // sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Services routes
  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get('/api/services/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.post('/api/services', requireAuth, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  app.put('/api/services/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, validatedData);
      res.json(service);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  app.patch('/api/services/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, validatedData);
      res.json(service);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  app.delete('/api/services/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteService(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Industries routes
  app.get('/api/industries', async (req, res) => {
    try {
      const industries = await storage.getIndustries();
      res.json(industries);
    } catch (error) {
      console.error("Error fetching industries:", error);
      res.status(500).json({ message: "Failed to fetch industries" });
    }
  });

  app.get('/api/industries/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const industry = await storage.getIndustry(id);
      if (!industry) {
        return res.status(404).json({ message: "Industry not found" });
      }
      res.json(industry);
    } catch (error) {
      console.error("Error fetching industry:", error);
      res.status(500).json({ message: "Failed to fetch industry" });
    }
  });

  app.post('/api/industries', requireAuth, async (req, res) => {
    try {
      const validatedData = insertIndustrySchema.parse(req.body);
      const industry = await storage.createIndustry(validatedData);
      res.status(201).json(industry);
    } catch (error) {
      console.error("Error creating industry:", error);
      res.status(500).json({ message: "Failed to create industry" });
    }
  });

  app.put('/api/industries/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertIndustrySchema.partial().parse(req.body);
      const industry = await storage.updateIndustry(id, validatedData);
      res.json(industry);
    } catch (error) {
      console.error("Error updating industry:", error);
      res.status(500).json({ message: "Failed to update industry" });
    }
  });

  app.delete('/api/industries/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteIndustry(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting industry:", error);
      res.status(500).json({ message: "Failed to delete industry" });
    }
  });

  app.post('/api/industries', requireAuth, async (req, res) => {
    try {
      const validatedData = insertIndustrySchema.parse(req.body);
      const industry = await storage.createIndustry(validatedData);
      res.status(201).json(industry);
    } catch (error) {
      console.error("Error creating industry:", error);
      res.status(500).json({ message: "Failed to create industry" });
    }
  });

  // Books routes
  app.get('/api/books', async (req, res) => {
    try {
      const books = await storage.getBooks();
      res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  app.post('/api/books', requireAuth, async (req, res) => {
    try {
      const validatedData = insertBookSchema.parse(req.body);
      const book = await storage.createBook(validatedData);
      res.status(201).json(book);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ message: "Failed to create book" });
    }
  });

  // Testimonials routes
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post('/api/testimonials', requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  // Articles routes
  app.get('/api/articles', async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get('/api/articles/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getArticle(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.post('/api/articles', requireAuth, async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error) {
      console.error("Error creating article:", error);
      res.status(500).json({ message: "Failed to create article" });
    }
  });

  app.put('/api/articles/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(id, validatedData);
      res.json(article);
    } catch (error) {
      console.error("Error updating article:", error);
      res.status(500).json({ message: "Failed to update article" });
    }
  });

  app.delete('/api/articles/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteArticle(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting article:", error);
      res.status(500).json({ message: "Failed to delete article" });
    }
  });

  // Contact forms routes
  app.get('/api/contact-forms', requireAuth, async (req, res) => {
    try {
      const forms = await storage.getContactForms();
      res.json(forms);
    } catch (error) {
      console.error("Error fetching contact forms:", error);
      res.status(500).json({ message: "Failed to fetch contact forms" });
    }
  });

  // Media files routes
  app.get('/api/media-files', async (req, res) => {
    try {
      const files = await storage.getMediaFiles();
      res.json(files);
    } catch (error) {
      console.error("Error fetching media files:", error);
      res.status(500).json({ message: "Failed to fetch media files" });
    }
  });

  app.get('/api/media-files/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const file = await storage.getMediaFile(id);
      if (!file) {
        return res.status(404).json({ message: "Media file not found" });
      }
      res.json(file);
    } catch (error) {
      console.error("Error fetching media file:", error);
      res.status(500).json({ message: "Failed to fetch media file" });
    }
  });

  app.post('/api/media-files/upload', requireAuth, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "لم يتم اختيار ملف" });
      }

      const { originalname, mimetype, buffer } = req.file;
      const fileType = getFileType(mimetype);
      let fileData: any;

      if (fileType === 'image') {
        // معالجة الصورة
        const processed = await processImage(buffer, originalname);
        const thumbnailFilename = await createThumbnail(buffer, processed.filename);
        
        fileData = {
          name: originalname,
          type: fileType,
          size: formatFileSize(processed.size),
          url: `/uploads/images/${processed.filename}`,
          dimensions: processed.dimensions,
          description: '',
          tags: [],
          thumbnail: `/uploads/thumbnails/${thumbnailFilename}`
        };
      } else {
        // معالجة ملف عادي
        const processed = await processFile(buffer, originalname, mimetype);
        const folder = fileType === 'video' ? 'videos' : 'documents';
        
        fileData = {
          name: originalname,
          type: fileType,
          size: formatFileSize(processed.size),
          url: `/uploads/${folder}/${processed.filename}`,
          dimensions: null,
          description: '',
          tags: []
        };
      }

      const newFile = await storage.createMediaFile(fileData);
      res.status(201).json(newFile);
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "فشل في رفع الملف" 
      });
    }
  });

  app.put('/api/media-files/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedFile = await storage.updateMediaFile(id, req.body);
      res.json(updatedFile);
    } catch (error) {
      console.error("Error updating media file:", error);
      res.status(500).json({ message: "Failed to update media file" });
    }
  });

  app.delete('/api/media-files/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMediaFile(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting media file:", error);
      res.status(500).json({ message: "Failed to delete media file" });
    }
  });

  // تقديم الملفات المرفوعة
  app.use('/uploads', express.static('uploads'));

  app.post('/api/contact-forms', async (req, res) => {
    try {
      const validatedData = insertContactFormSchema.parse(req.body);
      const form = await storage.createContactForm(validatedData);
      res.status(201).json(form);
    } catch (error) {
      console.error("Error creating contact form:", error);
      res.status(500).json({ message: "Failed to create contact form" });
    }
  });

  app.delete('/api/contact-forms/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContactForm(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting contact form:", error);
      res.status(500).json({ message: "Failed to delete contact form" });
    }
  });

  // Media files routes
  app.get('/api/media-files', requireAuth, async (req, res) => {
    try {
      const mediaFiles = await storage.getMediaFiles();
      res.json(mediaFiles);
    } catch (error) {
      console.error("Error fetching media files:", error);
      res.status(500).json({ message: "Failed to fetch media files" });
    }
  });

  app.post('/api/media-files', requireAuth, async (req, res) => {
    try {
      const validatedData = insertMediaFileSchema.parse(req.body);
      const mediaFile = await storage.createMediaFile(validatedData);
      res.status(201).json(mediaFile);
    } catch (error) {
      console.error("Error creating media file:", error);
      res.status(500).json({ message: "Failed to create media file" });
    }
  });

  app.delete('/api/media-files/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMediaFile(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting media file:", error);
      res.status(500).json({ message: "Failed to delete media file" });
    }
  });

  // Settings routes
  app.get('/api/settings', requireAuth, async (req, res) => {
    try {
      const { category } = req.query;
      if (category) {
        const settings = await storage.getSettingsByCategory(category as string);
        res.json(settings);
      } else {
        const settings = await storage.getSettings();
        res.json(settings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // Public settings endpoint for frontend
  app.get('/api/public-settings', async (req, res) => {
    try {
      const { category } = req.query;
      if (category) {
        const settings = await storage.getSettingsByCategory(category as string);
        res.json(settings);
      } else {
        const settings = await storage.getSettings();
        res.json(settings);
      }
    } catch (error) {
      console.error("Error fetching public settings:", error);
      res.status(500).json({ message: "Failed to fetch public settings" });
    }
  });

  app.post('/api/settings', requireAuth, async (req, res) => {
    try {
      const validatedData = insertSettingSchema.parse(req.body);
      const setting = await storage.createSetting(validatedData);
      res.status(201).json(setting);
    } catch (error) {
      console.error("Error creating setting:", error);
      res.status(500).json({ message: "Failed to create setting" });
    }
  });

  app.put('/api/settings/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertSettingSchema.partial().parse(req.body);
      const setting = await storage.updateSetting(id, validatedData);
      res.json(setting);
    } catch (error) {
      console.error("Error updating setting:", error);
      res.status(500).json({ message: "Failed to update setting" });
    }
  });

  // Seed database route (for initial data)
  app.post('/api/seed-database', async (req, res) => {
    try {
      const success = await seedDatabase();
      if (success) {
        res.json({ message: "Database seeded successfully" });
      } else {
        res.status(500).json({ message: "Failed to seed database" });
      }
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ message: "Failed to seed database" });
    }
  });

  // Page Content routes
  app.get('/api/page-content/:page', async (req, res) => {
    try {
      const page = req.params.page;
      const content = await storage.getPageContent(page);
      if (!content) {
        return res.status(404).json({ message: "Page content not found" });
      }
      res.json(content);
    } catch (error) {
      console.error("Error fetching page content:", error);
      res.status(500).json({ message: "Failed to fetch page content" });
    }
  });

  app.post('/api/page-content/:page', requireAuth, async (req, res) => {
    try {
      const page = req.params.page;
      const contentData = { ...req.body, page };
      const validatedData = insertPageContentSchema.parse(contentData);
      const content = await storage.upsertPageContent(validatedData);
      res.json(content);
    } catch (error) {
      console.error("Error saving page content:", error);
      res.status(500).json({ message: "Failed to save page content" });
    }
  });

  app.delete('/api/page-content/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePageContent(id);
      res.json({ message: "Page content deleted successfully" });
    } catch (error) {
      console.error("Error deleting page content:", error);
      res.status(500).json({ message: "Failed to delete page content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
