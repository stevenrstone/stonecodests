import React from "react";

import Button from "../components/home/button/button";
import Content from "../components/home/content/content";

import "../App.css";

const Home = () => (
  <>
    <section className="content-view">
      <Content />
    </section>
    <section className="menu">
      <div className="copy">
        <h1 className="title">Steven Stone | </h1>
        <span className="subtitle">Web Developer</span>
      </div>
      <nav className="nav">
        <Button link="/home/about">About</Button>
        <Button link="/home/professional-work">Career</Button>
        <Button link="/home/personal-work">Personal Work</Button>
      </nav>
    </section>
  </>
);

export default Home;
