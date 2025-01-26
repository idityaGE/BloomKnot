'use client';

import Link from "next/link"
import { HeartHandshake } from "lucide-react"
import AnimatedText from '@/components/footer/cursor-follow-text';

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "Instagram",
      href: "#",
      icon: () => (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className='sm:w-24 w-full'
        >
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: () => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='70'
          height='62'
          viewBox='0 0 70 62'
          fill='none'
          className='sm:w-24 w-full '
        >
          <path
            d='M55.1291 0H65.8629L42.4127 26.2626L70 62H48.3994L31.481 40.3254L12.1226 62H1.38228L26.4646 33.9092L0 0H22.149L37.4417 19.8114L55.1291 0ZM51.3619 55.7046H57.3096L18.9172 5.96472H12.5347L51.3619 55.7046Z'
            fill='currentColor'
          ></path>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: () => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox='0 0 80 78'
          fill='none'
          className='sm:w-24 w-full'
        >
          <path
            d='M16.6 8.79036C16.6 13.3937 12.9 17.1237 8.33333 17.1237C3.76667 17.1237 0.0666667 13.3937 0.0666667 8.79036C0.0666667 4.19036 3.76667 0.457031 8.33333 0.457031C12.9 0.457031 16.6 4.19036 16.6 8.79036ZM16.6667 23.7904H0V77.1237H16.6667V23.7904ZM43.2733 23.7904H26.7133V77.1237H43.2767V49.127C43.2767 33.5604 63.3733 32.287 63.3733 49.127V77.1237H80V43.3537C80 17.087 50.26 18.0437 43.2733 30.9737V23.7904Z'
            fill='currentColor'
          ></path>
        </svg>
      )
    }
  ],
}

function Footer() {
  return (
    <>
      <footer
        className='footer-bg relative border 2xl:h-[550px] h-fit lg:pb-20 w-[95%] mx-auto mb-8 rounded-lg overflow-hidden radial-gradient-bg
                   [--gradient-center:#f3f4f6] [--gradient-edge:#f3f4f6]
                   dark:[--gradient-center:#02081765] dark:[--gradient-edge:#020817]'
      >
        <div className='gap-10 sm:flex justify-between p-5 2xl:py-8 py-5 rounded-sm rounded-b-none'>
          <div className='w-fit flex-col  flex  justify-center'>
            <HeartHandshake className='2xl:w-24 w-20 h-20' />
            <article className='py-2  2xl:w-80 w-64  space-y-1'>
              <h1 className='newFont text-3xl font-bold'>BloomKnot</h1>
              <p className='text-sm  leading-[120%] '>
                Let us create the perfect celebration of your love story. From intimate gatherings to grand celebrations, we make your dream wedding a reality.
              </p>
            </article>
          </div>

          <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-bold'>Quick Links</h2>
            <ul className='space-y-2'>
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}
                    className="text-lg font-semibold hover:text-blue-300 hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='sm:block flex sm:mt-0 mt-4  gap-2 sm:w-auto w-full sm:space-y-2 relative z-[1]'>
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='sm:w-auto w-full  grid place-content-center 2xl:h-28 h-32 2xl:p-5 p-5 rounded-lg'>
                {item.icon()}
              </Link>
            ))}
          </div>
        </div>
        <div className='lg:flex hidden'>
          <AnimatedText
            text='BLOOMKNOT'
            className='2xl:text-[11rem] text-[12vw]'
          />
        </div>
      </footer>
    </>
  );
}

export { Footer };
