import Reveal from "@/components/Reveal";
import BrushDivider from "./BrushDivider";
import KanjiNumber from "./KanjiNumber";

interface Props {
  number: string;
  titleEn: string;
  titleZh: string;
}

const SectionHeader = ({ number, titleEn, titleZh }: Props) => (
  <div>
    <Reveal>
      <div className="section-header !mb-6">
        <div className="w-14 h-14 md:w-16 md:h-16 shrink-0">
          <KanjiNumber numeral={number} className="w-full h-full" />
        </div>
        <div>
          <div className="section-title-zh">{titleZh}</div>
          <h2 className="section-title-en">{titleEn}</h2>
        </div>
        <div className="section-line" />
      </div>
    </Reveal>
    <div className="mb-12 md:mb-16 ml-0 md:ml-20">
      <BrushDivider className="!mx-0" />
    </div>
  </div>
);

export default SectionHeader;
