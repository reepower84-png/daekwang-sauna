'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Company Info */}
          <div>
            <Image
              src="/images/대광생활건강_로고_v1-removebg-preview.png"
              alt="대광생활건강"
              width={180}
              height={50}
              className="h-14 w-auto brightness-0 invert mb-4"
            />
            <div className="space-y-2 text-sm">
              <p>상호: 대광생활건강</p>
              <p>대표번호: 02-2289-1436</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:text-right">
            <div className="flex flex-wrap gap-4 md:justify-end mb-4">
              <button
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-white transition-colors"
              >
                홈
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-white transition-colors"
              >
                제품특징
              </button>
              <button
                onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-white transition-colors"
              >
                사용효과
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-white transition-colors"
              >
                상담문의
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} 대광생활건강. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
