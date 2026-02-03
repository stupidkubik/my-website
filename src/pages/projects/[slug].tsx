import type { GetStaticPaths, GetStaticProps } from "next";

const projectData = {
  "kanban-board": {
    title: "Kanban Board App",
    summary: "A drag-and-drop task management tool built with Next.js and Firebase.",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Redux Toolkit", "Firebase", "dnd-kit", "Tailwind CSS"],
    challenges: [
      "Managing complex drag-and-drop state across columns.",
      "Ensuring performance with frequent updates.",
      "Maintaining accessibility for keyboard users."
    ],
    approach: [
      "Structured state with Redux Toolkit and normalized entities.",
      "Optimized renders with memoized selectors and component boundaries.",
      "Used dnd-kit accessibility features and tested keyboard flows."
    ],
    outcome:
      "Delivered a responsive, accessible board with real-time sync and a clear interaction model.",
    links: {
      demo: "",
      code: ""
    }
  },
  "stripe-mini-app": {
    title: "Stripe Mini App",
    summary: "Checkout prototype with Stripe integration and schema validation.",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Stripe", "Zod", "Tailwind CSS"],
    challenges: [
      "Building a reliable checkout flow and error handling.",
      "Maintaining a clean UI for sensitive forms."
    ],
    approach: [
      "Used Stripe Checkout for secure payments.",
      "Validated input with Zod and provided clear form feedback."
    ],
    outcome: "Completed end-to-end payment flow prototype with a polished UI.",
    links: {
      demo: "",
      code: ""
    }
  },
  "admin-dashboard": {
    title: "Admin Dashboard MVP",
    summary: "A modular dashboard interface for data visualization.",
    role: "Frontend Developer",
    stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS"],
    challenges: [
      "Designing reusable dashboard components.",
      "Handling async data and loading states."
    ],
    approach: [
      "Defined reusable UI primitives and consistent spacing rules.",
      "Centralized data fetching with RTK Query."
    ],
    outcome: "Shipped a scalable admin layout with clear information hierarchy.",
    links: {
      demo: "",
      code: ""
    }
  }
} as const;

type ProjectSlug = keyof typeof projectData;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(projectData).map((slug) => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as ProjectSlug;
  return {
    props: {
      project: projectData[slug]
    }
  };
};

type ProjectPageProps = {
  project: (typeof projectData)[ProjectSlug];
};

export default function ProjectDetail({ project }: ProjectPageProps) {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm text-zinc-500">Projects</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-base text-zinc-700">{project.summary}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Role</h2>
            <p className="mt-2 text-sm text-zinc-700">{project.role}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Stack</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Challenges</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700">
            {project.challenges.map((challenge) => (
              <li key={challenge}>{challenge}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Approach</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700">
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Outcome</h2>
          <p className="mt-3 text-base text-zinc-700">{project.outcome}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Links</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {project.links.demo ? (
              <a className="underline" href={project.links.demo}>
                Live Demo
              </a>
            ) : (
              <span className="text-zinc-500">Live Demo (pending)</span>
            )}
            {project.links.code ? (
              <a className="underline" href={project.links.code}>
                Source Code
              </a>
            ) : (
              <span className="text-zinc-500">Source Code (pending)</span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
