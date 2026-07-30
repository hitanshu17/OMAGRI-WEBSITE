const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#eef1e2]">
      {/* Bottom copyright bar */}
      <div className="bg-black px-6 py-5 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center text-sm md:flex-row md:items-center md:justify-between md:text-left">
          <span className="text-gray-300">
            Copyright &copy; {currentYear} OMM AGRI VILLA LLP,
            <br className="md:hidden" /> All Rights Reserved
          </span>
          <span className="text-gray-300 font-bold">
            Site by:{" "}
            <a
              href="https://visualsoftech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a5d82f]"
            >
              Visual Softech
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;