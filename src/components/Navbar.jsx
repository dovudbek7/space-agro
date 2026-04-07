import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  ];

  const currentLangCode = i18n.language ? i18n.language.split('-')[0] : "en";
  const currentLang = languages.find((l) => l.code === currentLangCode) || languages[0];

  const changeLanguage = async (code) => {
    await i18n.changeLanguage(code);
    setIsLangOpen(false);
    setIsOpen(false);
  };

  const menuItems = [
    { name: t("navHome"), id: "home" },
    { name: t("navAbout"), id: "about" },
    { name: t("navServices"), id: "services" },
    { name: t("navFAQ"), id: "faq" },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { targetId: id } });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (location.pathname === "/" && location.state?.targetId) {
      const element = document.getElementById(location.state.targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <nav className="fixed top-6 left-0 right-0 z-[9999] px-4">
      <div className="container mx-auto max-w-[1200px]">
        <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-full px-4 py-2 md:px-8 flex items-center justify-between shadow-lg">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <p className="text-[20px] font-bold text-[#0A252A]">Space Agro</p>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-[#0A252A] font-medium hover:text-green-700 transition-colors text-[16px]"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all text-[#0A252A]"
              >
                <span className="uppercase font-bold text-sm">{currentLang.code}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl p-2"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => changeLanguage(l.code)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${currentLangCode === l.code ? 'bg-[#E2F350]/30 font-bold' : 'hover:bg-gray-50'}`}
                      >
                        <span>{l.flag}</span>
                        <span className="text-sm font-medium">{l.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact-us">
              <button className="bg-[#E2F350] text-[#0A252A] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#d4e645] transition-all">
                {t("contactUs")} <span>→</span>
              </button>
            </Link>
          </div>

          <button className="lg:hidden p-2 text-[#0A252A]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-4 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100"
            >
              <ul className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className="text-xl font-normal text-[#0A252A] block p-2"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <hr className="my-2" />
                <div className="flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)}
                      className={`px-4 py-2 rounded-full border ${currentLangCode === l.code ? 'bg-[#E2F350] border-transparent font-bold' : 'border-gray-200'}`}
                    >
                      {l.flag} {l.code.toUpperCase()}
                    </button>
                  ))}
                </div>
                <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                  <button className="bg-[#E2F350] text-[#0A252A] w-full py-4 rounded-full font-bold mt-4">
                    {t("contactUs")} →
                  </button>
                </Link>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;