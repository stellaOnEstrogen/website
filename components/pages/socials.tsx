'use client'

import Layout from '../Layout'
import { config } from '@/config'

export function SocialsComponent() {
  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-pink-600 text-center">Socials ヽ(♡‿♡)ノ</h2>
        <div className="grid grid-cols-2 gap-4">
          {
            config.socials && config.socials.map((link, index) => (
              <a
                key={index}
                href={`/links/${link.name.toLowerCase()}`}
                className="flex items-center justify-center bg-pink-100 p-4 rounded-lg text-pink-600 hover:bg-pink-200 transition-colors"
              >
                {
                  link.icon && (
                    <link.icon className="h-6 w-6 mr-2" />
                  )
                }
                {link.name}
              </a>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}