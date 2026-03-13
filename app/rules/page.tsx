import Image from "next/image"
import { CheckList, PageHero } from "@/components/layout"
import { dogRules, essentialGear, importantInfo, rules } from "@/components/site-data"

export default function RulesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Rules"
        title="Fishery rules and practical guidance"
        text="Everything anglers need to know before arriving on site."
      />
      <section className="section container feature-split">
        <div className="image-card tall">
          <Image src="/images/gallery/rules-sign.jpg" alt="Alderwood Ponds rules sign" fill className="image-fill" />
          <div className="image-caption overlay">Clear guidance before you arrive on the bank</div>
        </div>
        <div className="panel soft-panel">
          <h2>Fishery rules</h2>
          <CheckList items={rules} />
        </div>
      </section>
      <section className="section container price-sections">
        <div className="panel"><h2>Essential gear and cabin guidance</h2><CheckList items={essentialGear} /></div>
        <div className="panel"><h2>Dogs and visitors</h2><CheckList items={dogRules} /></div>
        <div className="panel full-span"><h2>Important for anglers</h2><CheckList items={importantInfo} /></div>
      </section>
    </main>
  )
}
