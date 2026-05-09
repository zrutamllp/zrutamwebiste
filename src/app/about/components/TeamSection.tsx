import FadeInSection from "@/shared/components/FadeInSection";
import Image from "next/image";
import teamMembers from "../teamData";

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Our Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A passionate team of L&amp;D experts, technologists, and
              strategists dedicated to transforming workforce development.
            </p>
          </div>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <FadeInSection key={member.role} delay={index * 0.1}>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-navy">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
