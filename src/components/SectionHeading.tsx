interface SectionHeadingProps {
  id: string;
  title: string;
}

export function SectionHeading({ id, title }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center sm:mb-14">
      <h2
        id={id}
        className="font-display text-2xl font-semibold tracking-[0.06em] text-[#FEC544] sm:text-[26px]"
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className="relative mx-auto mt-3.5 h-[2px] w-44 bg-[#3F4551]"
      >
        <span className="absolute inset-y-0 left-1/2 w-16 -translate-x-1/2 bg-[#FEC544]" />
      </div>
    </div>
  );
}
