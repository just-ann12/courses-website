import React from "react";
import { Link } from "react-router-dom";

import Container from "../shared/container";

const Header = () => {
  return (
    <header className="bg-courses-green w-full py-4">
      <Container>
        <Link to="/" className="text-xl bold text-white">
          Wisey
        </Link>
      </Container>
    </header>
  );
};

export default Header;
