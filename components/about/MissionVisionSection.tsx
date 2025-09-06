// components/about/MissionVisionSection.tsx
export default function MissionVisionSection() {
    return (
      <section className="bg-base-bg py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {/* Mission Block */}
            <div className="flex flex-col items-start gap-6 lg:flex-row">
              <div className="flex-1 border-l-4 border-primary pl-4">
                <h3 className="font-montserrat text-3xl font-medium text-tertiary">
                  Our Mission
                </h3>
                <p className="mt-4 font-nunito text-base text-tertiary">
                To provide the UPEI community with opportunities for direct 
                environmental action and education. We organize events that 
                empower students to create a more sustainable campus.
                </p>
              </div>
              <div className="h-48 w-full flex-shrink-0 rounded-md bg-accent-bg lg:h-full lg:w-48" />
            </div>
  
            {/* Vision Block */}
            <div className="flex flex-col items-start gap-6 lg:flex-row">
              <div className="flex-1 border-l-4 border-primary pl-4">
                <h3 className="font-montserrat text-3xl font-medium text-tertiary">
                  Our Vision
                </h3>
                <p className="mt-4 font-nunito text-base text-tertiary">
                A UPEI campus that is a leader in sustainability, where 
                environmental awareness is part of our shared culture and 
                students are equipped to lead the change.
                </p>
              </div>
              <div className="h-48 w-full flex-shrink-0 rounded-md bg-accent-bg lg:h-full lg:w-48" />
            </div>
          </div>
        </div>
      </section>
    );
  }