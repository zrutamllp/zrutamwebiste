import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/constants";
import FadeInSection from "@/components/FadeInSection";
import CTABanner from "@/components/CTABanner";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { cardClasses } from "@/components/ui/Card";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found | Zrutam" };
  return {
    title: `${post.title} | Zrutam Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const articleContent: Record<string, string[]> = {
  "why-legacy-360-assessments-fail": [
    "If 360-degree feedback is so critical for frontline leadership development, why isn't it already standard practice? Because legacy HR tools are entirely incompatible with the modern workforce's attention span. By 2030, Generation Z will make up nearly 30% of the global workforce, rendering 1990s-era assessment tools obsolete.",

    "The Survey Fatigue Epidemic: Traditional 360 assessments contain 50 to 80 redundant questions — a catastrophic design flaw. Research from UC Irvine indicates the average on-screen attention span has plummeted from 2.5 minutes in 2004 to just 47 seconds today. SurveySparrow data reveals high dropout rates after just 9 minutes on mobile and 12 minutes on desktop. When organizations force employees through a 45-minute survey, respondents rush through to finish, destroying the accuracy of behavioral data.",

    "The 50-Question Danger Zone: The correlation between survey length and data quality is undeniable. A Milieu Insight study demonstrates that surveys with 10 to 20 questions yield 88% to 91% satisfaction rates. Once a survey crosses 50 questions (roughly 10 minutes), satisfaction plummets to 56% and the attention fail rate doubles.",

    "The 40-Page Paralysis and Prohibitive Costs: Legacy systems generate massive 40-page PDF reports filled with complex charts. For a new frontline manager, receiving a 40-page dossier isn't empowering — it's paralyzing. These assessments cost between $100 to $500 per employee. Scaling a $300, 60-question assessment across hundreds of frontline managers is a financial and logistical impossibility.",

    "At Zrutam LLP, we recognized the traditional multi-rater model was fundamentally broken — too long, too expensive, and misaligned with frontline reality. Our Zrutam 360° Assessment eliminates survey fatigue with frictionless 10-15 minute surveys focused on core observable competencies. Instead of paralyzing 40-page PDFs, managers receive clear, prioritized insights with 2-3 specific growth areas. Starting at just ₹1,999 INR (approx. $24 USD) per person, elite leadership insights no longer require an executive-tier budget.",

    "You cannot fix systemic engagement or productivity issues without developing your frontline. Calculate your organization's hidden financial risk with our free Organizational Risk Calculator at /360-calculator, then explore the Zrutam 360° Assessment at /tools/360.",
  ],
  "why-idps-fail-and-how-to-fix-them": [
    "Individual Development Plans have been a staple of corporate talent development for decades. Yet a significant majority of IDPs fail to produce meaningful outcomes. The reasons range from lack of personalization to poor follow-through, and the consequences are felt across organizations in the form of disengaged employees and stagnant leadership pipelines.",
    "The most common failure point is treating the IDP as a compliance exercise rather than a genuine development tool. When employees are asked to fill out a template once a year and then file it away, the IDP becomes nothing more than administrative overhead. Effective IDPs require ongoing engagement, regular check-ins, and alignment between individual career aspirations and organizational priorities.",
    "Technology can play a transformative role in making IDPs work. AI-driven platforms can personalize development recommendations based on real-time skill assessments, career driver analysis, and market trends. When an IDP tool adapts to the individual rather than forcing a one-size-fits-all approach, engagement and completion rates increase dramatically.",
    "At Zrutam, our IDP Tool powered by the proprietary RSI Career Driver Assessment addresses these challenges head-on. By identifying each employee's unique Role, Skill, and Interest drivers, we create development plans that resonate personally while serving the strategic needs of the organization. The result is an IDP that employees actually want to use and managers can meaningfully support.",
  ],
  "upskilling-vs-reskilling-what-chros-need-to-know": [
    "The terms upskilling and reskilling are often used interchangeably, but for CHROs building a workforce strategy, the distinction matters significantly. Upskilling refers to teaching employees new competencies within their current role to keep pace with evolving requirements. Reskilling, on the other hand, involves training employees for entirely different roles, often in response to automation, restructuring, or strategic pivots.",
    "The World Economic Forum projects that nearly half of the global workforce will need significant reskilling by 2027. For organizations in India, the Middle East, and Southeast Asia, this challenge is amplified by rapidly evolving technology sectors, young and ambitious workforces, and intense competition for specialized talent.",
    "Forward-thinking CHROs are moving beyond reactive training programs toward a skills-first talent strategy. This means mapping the complete skills landscape of the organization, identifying gaps relative to future business needs, and deploying targeted learning interventions. The key is building internal mobility pathways that allow employees to grow into new roles rather than looking externally.",
    "A skills-first approach requires the right technology infrastructure. AI-powered platforms can assess skills in real time, recommend personalized learning pathways, and track progress toward proficiency. When combined with tools like competency mapping, career pathing, and internal talent marketplaces, organizations can build the workforce agility needed to thrive in a rapidly changing market.",
  ],
  "ai-in-leadership-development-india-market": [
    "India's corporate learning and development market is experiencing a fundamental shift as artificial intelligence transforms how organizations identify, develop, and retain leadership talent. With a large and growing enterprise sector, India represents one of the most dynamic markets for AI-powered L&D solutions globally.",
    "Traditional leadership development in India has relied heavily on classroom-based programs, external coaching engagements, and generic online courses. While these approaches have their place, they often struggle with personalization at scale, consistency across geographically dispersed teams, and demonstrating measurable ROI to budget-conscious stakeholders.",
    "AI is changing this equation by enabling adaptive learning paths that respond to each leader's unique strengths, development areas, and learning preferences. Scenario-based simulations can recreate complex business situations specific to Indian market dynamics, allowing leaders to practice decision-making in a risk-free environment. Natural language processing enables real-time feedback on communication skills, while predictive analytics identify high-potential talent earlier in the pipeline.",
    "For enterprises operating across India's diverse business landscape, AI-powered leadership development offers the scalability and personalization that traditional methods cannot match. Organizations that invest in these technologies today are building a significant competitive advantage in attracting, developing, and retaining the leaders who will drive business growth in the coming decade.",
  ],
  "how-to-measure-ld-roi-practical-guide": [
    "Demonstrating the return on investment of learning and development initiatives remains one of the most persistent challenges for L&D professionals. In boardrooms across APAC, stakeholders increasingly demand quantifiable evidence that training programs contribute to business outcomes, not just completion certificates.",
    "A practical ROI framework starts with defining clear, measurable objectives before the program begins. These should connect learning outcomes to business metrics such as productivity improvements, error rate reductions, time-to-competency for new skills, employee retention, and internal promotion rates. The Kirkpatrick model provides a useful foundation, but modern L&D measurement goes further by incorporating predictive analytics and real-time skill assessment data.",
    "Technology plays a critical role in making L&D ROI measurement feasible at scale. AI-powered platforms can track not just course completion but actual skill acquisition, application on the job, and correlation with performance metrics. Dashboards that aggregate data across the learning ecosystem give L&D leaders the visibility they need to optimize programs continuously.",
    "The organizations that succeed in measuring L&D ROI are those that treat measurement as an ongoing discipline rather than an afterthought. By building evaluation criteria into program design from the start, leveraging technology for data collection and analysis, and reporting results in the language of business outcomes, L&D teams can demonstrate their strategic value and secure continued investment in workforce development.",
  ],
  "building-skills-first-organisation-apac": [
    "The shift from role-based to skills-based talent management represents one of the most significant transformations in how APAC organizations attract, develop, and deploy their workforce. In a skills-first organization, hiring, promotion, and development decisions are driven by verified competencies rather than job titles, tenure, or credentials alone.",
    "This shift is particularly relevant in the APAC context, where diverse education systems, rapid economic growth, and a young workforce create unique challenges for traditional talent management approaches. Organizations in India, Singapore, the UAE, and other APAC markets are finding that a skills-first approach enables them to tap into a broader talent pool and build more adaptable teams.",
    "Building a skills-first organization requires three foundational capabilities. First, a comprehensive skills taxonomy that defines what skills matter for the organization now and in the future. Second, a reliable assessment infrastructure that can measure skills accurately and at scale. Third, a connected technology ecosystem that integrates skills data into every talent decision, from hiring through succession planning.",
    "Organizations that have successfully made this transition report significant improvements in internal mobility, employee engagement, and workforce agility. The journey is not without challenges, particularly around change management and technology integration, but the strategic benefits of knowing and leveraging the full skill capacity of your workforce make the investment worthwhile for forward-looking APAC enterprises.",
  ],
};

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const content = articleContent[post.slug] || [];
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(
    0,
    3
  );

  return (
    <>
      {/* Article header */}
      <section className="relative bg-paper grain overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-96 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-6 pt-32 pb-14 md:pt-40 md:pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-semibold mb-10 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-4">
            {post.category}
          </p>
          <h1 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-ink text-balance mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-navy-500 text-sm">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-navy-300" aria-hidden="true" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 md:py-20 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <article className="max-w-[65ch] mx-auto">
            {content.map((paragraph, index) => (
              <FadeInSection key={index} delay={Math.min(index, 3) * 0.08}>
                <p className="text-navy-700 text-lg leading-relaxed mb-6">
                  {paragraph}
                </p>
              </FadeInSection>
            ))}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-navy-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-navy-500 mr-2">Tags:</span>
                {post.keyword.split(" ").map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white border border-navy-100 text-navy-600 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author / CTA end matter */}
            <div className="mt-12 bg-white border border-navy-100 rounded-2xl p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-3">
                From the Zrutam team
              </p>
              <p className="text-navy-600 leading-relaxed mb-6">
                We help APAC organizations build leadership pipelines and
                skills-first workforces with AI-powered L&D tools. Curious how
                these ideas apply to your organization?
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <Button href="/contact/">Talk to Us</Button>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  <span className="link-underline">Back to all articles</span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related articles */}
      <section className="py-20 md:py-28 bg-paper border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <SectionHeading
              eyebrow="Keep reading"
              title={
                <>
                  Related <em className="italic text-teal-600">insights</em>
                </>
              }
            />
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related, index) => (
              <FadeInSection
                key={related.slug}
                delay={index * 0.08}
                className="h-full"
              >
                <Link
                  href={`/blog/${related.slug}`}
                  className={cardClasses(true, "group flex flex-col h-full p-6")}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 mb-3">
                    {related.category}
                  </p>
                  <h3 className="font-display text-lg leading-snug text-ink mb-4 transition-colors group-hover:text-teal-700">
                    {related.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-xs text-navy-500">
                    <time dateTime={related.date}>
                      {new Date(related.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span
                      className="w-1 h-1 rounded-full bg-navy-300"
                      aria-hidden="true"
                    />
                    <span>{related.readTime}</span>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={
          <>
            Ready to transform your{" "}
            <em className="italic text-amber-400">workforce</em>?
          </>
        }
        subtitle="Discover how Zrutam's AI-powered L&D solutions can drive measurable outcomes."
        primaryCTA={{ text: "Book a Demo", href: "/contact/" }}
        secondaryCTA={{ text: "Explore Solutions", href: "/solutions/" }}
      />
    </>
  );
}
