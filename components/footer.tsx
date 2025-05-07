import Link from "next/link"
import Image from "next/image"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image src="/logo.svg" alt="QuantumDiagnose Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-xl">Arogya-Sentinel</span>
            </Link>
            <p className="text-slate-300 text-sm">
              Advanced AI-powered platform for screening heart disease, kidney disease, liver disease, and diabetes with
              high accuracy machine learning models.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-slate-300 hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-slate-300 hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-slate-300 hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-slate-300 hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-5 w-5 text-slate-300 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-slate-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#diseases" className="text-slate-300 hover:text-white transition-colors">
                  Diseases
                </Link>
              </li>
              <li>
                <Link href="/#research" className="text-slate-300 hover:text-white transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/#team" className="text-slate-300 hover:text-white transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Disease Screening */}
          <div>
            <h3 className="font-bold text-lg mb-4">Disease Screening</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/screening/heart" className="text-slate-300 hover:text-white transition-colors">
                  Heart Disease
                </Link>
              </li>
              <li>
                <Link href="/screening/kidney" className="text-slate-300 hover:text-white transition-colors">
                  Kidney Disease
                </Link>
              </li>
              <li>
                <Link href="/screening/liver" className="text-slate-300 hover:text-white transition-colors">
                  Liver Disease
                </Link>
              </li>
              <li>
                <Link href="/screening/diabetes" className="text-slate-300 hover:text-white transition-colors">
                  Diabetes
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-slate-300">Bharati Vidyateeth College Of Engineering, Paschim Vihar</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-slate-300">+ 91 8799761201</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-slate-300">info@bvp.co.in</span>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <Heart className="h-5 w-5 text-accent shrink-0" />
                <Link href="/#donate" className="text-accent hover:underline">
                  Support Our Research
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Arogya-Sentinel. All rights reserved by Archit Sharma.</p>
          <p className="mt-2">
            <span className="text-xs">
              Disclaimer: This platform is intended for educational and research purposes only. It is not a substitute
              for professional medical advice, diagnosis, or treatment.
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

