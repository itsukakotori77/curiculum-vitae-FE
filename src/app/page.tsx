import Image from 'next/image'
import Homepage from '@/components/pages/home/Home'
import Layout from '@/components/globals/layouts/Layout'

export default function Home() {
  return (
    <Layout>
      <Homepage title={'Make your dream CV right now !'} />
    </Layout>
  )
}
