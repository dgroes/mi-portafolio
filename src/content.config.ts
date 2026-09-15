import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const experiencesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/experiences" }),
  schema: z.object({
    id: z.number(),
    company: z.string(),
    position: z.array(z.string()),
    status: z.number(),
    webPage: z.string().url(),
    starDate: z.string(),
    endDate: z.string().optional(),
    duties: z.array(z.string()),
    responsibilities: z.array(z.string()),
    tools: z.array(z.string()),
  }),
});


const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/projects" }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    status: z.number(),
    description: z.string(),
    functionality: z.array(z.string()),
    tools: z.array(z.string()),
    github: z.string()
  })
})

const technologiesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/content/technologies"
  }),
  schema: z.object({
    name: z.string(),
    icons: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ),
  })
});

export const collections = {
  experiences: experiencesCollection,
  technologies: technologiesCollection,
  projects: projectsCollection,
}