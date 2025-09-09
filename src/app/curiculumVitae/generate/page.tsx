import React from 'react'
import Layout from '@/components/globals/layouts/Layout'
import CurrVitaeGenerator from '@/components/pages/curiculumVitae/generator/CurrVitaeGenerator'

export default function Page() {
  return (
    <Layout useHeader={false}>
      <CurrVitaeGenerator />
    </Layout>
  )
}
