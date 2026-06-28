export interface PortfolioItem {
  slug: string;
  title: string;
  logo: string;
  mainImage: string;
  shortDescription: string;
  projectUrl: string;
  content: string;
  sortOrder: string;
  categories?: string[]; // We'll add this for filtering
}

// Add a check for client-side environment at the top of the fetchPortfolioData function

export async function fetchPortfolioData(): Promise<PortfolioItem[]> {
  // Use a cache to avoid refetching the data multiple times
  if (typeof window !== "undefined" && (window as any).__portfolioCache) {
    return (window as any).__portfolioCache;
  }

  try {
    // Use local sample file as primary source for template
    const response = await fetch("/data/portfolio-sample.csv", {
      // Add cache: 'no-store' for server components to always fetch fresh data
      cache: typeof window === "undefined" ? "no-store" : "default",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio CSV: ${response.status}`);
    }

    const csvText = await response.text();
    const parsedData = parseCSV(csvText);

    // Cache the data on the client side
    if (typeof window !== "undefined") {
      (window as any).__portfolioCache = parsedData;
    }

    return parsedData;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    // Return fallback sample data if CSV fails to load
    return getFallbackPortfolioData();
  }
}

// Fallback data in case CSV file fails to load
function getFallbackPortfolioData(): PortfolioItem[] {
  return [
    {
      slug: "Company Portfolio",
      title: "Arab Sign Craft",
      logo: "https://res.cloudinary.com/dpw89wko7/image/upload/v1754664457/ArabSIgnCraftLogoFinalsvg_ygfihi.svg",
      mainImage: "/portfolio-images/arab-sign-craft-1.png",
      shortDescription: "A Premium Company Portfolio of a Sign Craft Company",
      projectUrl: "",
      content: `<h3>Project Overview</h3><p>Arab Sign Craft is a professional signage manufacturing and installation business. The project involved building a modern and visually appealing full-stack website to showcase their services and past work</p><h3>Key Features</h3><ul><li>High-impact fullscreen Work Gallery layout</li><li>Clean, professional UI tailored for a non-technical business audience</li><li>Smooth image transitions and responsive display handling different aspect ratios</li><li>Service showcase sections with clear call-to-action emphasis</li><li>Optimized navigation and layout for client presentation and future scalability</li></ul><h3>Technologies Used</h3><p>The website was built using React (frontend) with a strong focus on UI/UX. The project prototype managed all data on the frontend side, ensuring quick interactions for showcasing to the client. The structure is designed to easily integrate backend functionality in later phases</p>`,
      sortOrder: "2025-06-15",
      categories: ["all", "web", "Portfolio"],
    },
    {
      slug: "Gym Management System",
      title: "Fit Culture Gym",
      logo: "", //need to add
      mainImage: "/portfolio-images/fit-culture-gym-2.png",
      shortDescription: "A Gym Management System For The Admin",
      projectUrl: "",
      content: `<h3>Project Overview</h3><p>Fit Culture Gym Management System is an interactive prototype designed to help fitness centers manage their members efficiently. The focus was on building a highly polished frontend experience to showcase the workflow to a non-technical client, with smooth UI interactions and category-based member filtering for better clarity and professionalism.</p><h3>Key Features</h3><ul><li>Add new members with structured detail input</li><li>Dynamic Members List with instant frontend rendering</li><li>Smart categorization</li><li>Clean dashboard layout designed for easy client demonstration</li><li>UI/UX optimized to make the prototype feel like a fully developed SaaS product</li><li>Mobile Responsive</li></ul><h3>Technical Implementation</h3><p>The system was developed using React + Tailwind CSS (frontend) and PostgreSQL with NenoDB (backend/database). The backend handles structured data storage and retrieval, while the frontend delivers a responsive and modern user experience, closely aligned with SaaS product standards.</p>`,
      sortOrder: "2025-07-10",
      categories: ["all", "web", "management"],
    },
     {
      slug: "Wraptalk",
      title: "NPM Package",
      logo: "", //need to add
      mainImage: "/portfolio-images/wraptalk-thumbnail.png",
      shortDescription: "An NPM Package for react app",
      projectUrl: "",
      content: `<h3>Project Overview</h3><p>WrapTalk is a simple and efficient translation package for React applications. It allows developers to wrap text components and manage translations seamlessly using AI-generated translations.</p><h3>Key Features</h3><ul><li>Easy-to-use <TranslateThis> component for text translation.</li><li>AI-generated translations using the Gemini AI.</li><li>Supports storing and managing translations in JSON files.</li></ul>`,
      sortOrder: "2025-03-28",
      categories: ["all", "web", "ai solutions"],
    },
    // {
    //   slug: "Club Portfolio",
    //   title: "Club 404 (Non-Profitable)",
    //   logo: "/Club-404-logo.jpg", 
    //   mainImage: "/portfolio-images/club-404-1.png",
    //   shortDescription: "A Animated Portfolio for a College Coding Club",
    //   projectUrl: "https://club404-page.vercel.app/",
    //   content: `<h3>Project Overview</h3><p>Club 404 Portfolio is a digital identity platform designed for a tech-driven community to showcase its members, events, and projects. The goal was to create a developer-styled portfolio website with a modern, dark-themed aesthetic inspired by Brutalistic culture. The platform positions Club 404 as a serious tech collective, helping attract new members, collaborations, and potential sponsors.</p><h3>Key Features</h3><ul><li>Developer-themed UI with Brutalistic dark interface and glitch/terminal-inspired design elements</li><li>Brand voice customization</li><li>Sections for community introduction, core team, events, and project showcases</li><li>Dynamic layout to highlight active initiatives and achievements</li><li>Smooth scrolling and modern portfolio-style page transitions</li><li>Responsive design optimized for desktop-first tech audience</li></ul><h3>Technologies Used</h3><p>Built using React, Tailwind CSS, and Framer Motion, the website delivers a high-performance and visually engaging portfolio experience. The architecture is lightweight and modular, making it easy to scale with additional dynamic content or CMS integration."</p>`,
    //   sortOrder: "2024-09-25",
    //   categories: ["all", "web", "portfolio"],
    // },
  ];
}

function parseCSV(csvText: string): PortfolioItem[] {
  // Split the CSV into lines
  const lines = csvText.split("\n");

  // Extract headers (first line)
  const headers = lines[0]
    .split(",")
    .map((header) => header.trim().replace(/^"/, "").replace(/"$/, ""));

  // Map CSV columns to our interface properties
  const columnMap: Record<string, keyof PortfolioItem> = {
    Slug: "slug",
    Title: "title",
    Logo: "logo",
    "Main Image": "mainImage",
    "Short Description": "shortDescription",
    "Project URL": "projectUrl",
    Content: "content",
    "Sort Order": "sortOrder",
  };

  // Parse the data rows
  const items: PortfolioItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue; // Skip empty lines

    // Handle CSV values that might contain commas within quotes
    const values: string[] = [];
    let currentValue = "";
    let insideQuotes = false;

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];

      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim().replace(/^"/, "").replace(/"$/, ""));
        currentValue = "";
      } else {
        currentValue += char;
      }
    }

    // Add the last value
    values.push(currentValue.trim().replace(/^"/, "").replace(/"$/, ""));

    // Create the portfolio item
    const item: Partial<PortfolioItem> = {};

    // Map values to properties
    headers.forEach((header, index) => {
      const key = columnMap[header];
      if (key && index < values.length) {
        item[key] = values[index];
      }
    });

    // Add categories based on content or title for filtering
    item.categories = inferCategories(item as PortfolioItem);

    items.push(item as PortfolioItem);
  }

  // Sort by sortOrder
  return items.sort((a, b) => {
    return new Date(b.sortOrder).getTime() - new Date(a.sortOrder).getTime();
  });
}

function inferCategories(item: PortfolioItem): string[] {
  const categories: string[] = ["all"];

  // Add categories based on content keywords
  const contentLower = (item.content || "").toLowerCase();
  const titleLower = (item.title || "").toLowerCase();
  const descriptionLower = (item.shortDescription || "").toLowerCase();

  if (
    contentLower.includes("web3") ||
    contentLower.includes("blockchain") ||
    titleLower.includes("web3") ||
    descriptionLower.includes("web3") ||
    contentLower.includes("crypto") ||
    titleLower.includes("crypto") ||
    titleLower.includes("blockchain")
  ) {
    categories.push("web3");
  }

  if (
    contentLower.includes("bubble") ||
    contentLower.includes("no-code") ||
    contentLower.includes("nocode") ||
    contentLower.includes("no code")
  ) {
    categories.push("bubble");
  }

  if (
    contentLower.includes("ai") ||
    contentLower.includes("artificial intelligence") ||
    titleLower.includes("ai") ||
    descriptionLower.includes("ai") ||
    titleLower.includes("content") ||
    descriptionLower.includes("ai-powered")
  ) {
    categories.push("ai");
  }

  if (
    contentLower.includes("mobile") ||
    contentLower.includes("ios") ||
    contentLower.includes("android") ||
    titleLower.includes("app")
  ) {
    categories.push("mobile");
  }

  if (
    contentLower.includes("design") ||
    contentLower.includes("ui") ||
    contentLower.includes("ux") ||
    contentLower.includes("interface")
  ) {
    categories.push("design");
  }

  // Default to "web" if no specific category is found
  if (categories.length === 1) {
    categories.push("web");
  }

  return categories;
}

export function getProjectImage(item: PortfolioItem, theme: string | undefined): string {
  const isDark = theme === "dark";
  const slugLower = (item.slug || "").toLowerCase();
  const titleLower = (item.title || "").toLowerCase();
  
  if (
    slugLower.includes("company portfolio") || 
    titleLower.includes("company portfolio") ||
    slugLower.includes("arab sign craft") ||
    titleLower.includes("arab sign craft")
  ) {
    return isDark 
      ? "/project-banner/forgeyklabs-project1-dark.png" 
      : "/project-banner/forgeyklabs-project1-light.png";
  }
  
  if (
    slugLower.includes("gym management") || 
    titleLower.includes("gym management") ||
    slugLower.includes("fit culture gym") ||
    titleLower.includes("fit culture gym")
  ) {
    return isDark 
      ? "/project-banner/forgeyklabs-project2-dark.png" 
      : "/project-banner/forgeyklabs-project2-light.png";
  }
  
  if (
    slugLower.includes("npm package") || 
    titleLower.includes("npm package") ||
    slugLower.includes("wraptalk") ||
    titleLower.includes("wraptalk")
  ) {
    return isDark 
      ? "/project-banner/forgeyklabs-project3-dark.png" 
      : "/project-banner/forgeyklabs-project3-light.png";
  }
  
  return item.mainImage || "/placeholder.svg?height=600&width=800&query=project";
}
