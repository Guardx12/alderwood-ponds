import { CheckList, PageHero } from "@/components/layout"
import { dogRules, essentialGear, importantInfo, rules } from "@/components/site-data"

export default function RulesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Rules"
        title="Fishery rules and essential gear"
        text="Everything anglers need to know before arriving on site."
      />
      <section className="section container price-sections">
        <div className="panel"><h2>Fishery rules</h2><CheckList items={rules} /></div>
        <div className="panel"><h2>Essential gear</h2><CheckList items={essentialGear} /></div>
        <div className="panel"><h2>Rules for dogs</h2><CheckList items={dogRules} /></div>
        <div className="panel"><h2>Important for anglers</h2><CheckList items={importantInfo} /></div>
      </section>
    </main>
  )
}
