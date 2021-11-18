import "../styles/globals.css"
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import "twin.macro";
import Button from "../components/Button";
import { CardTailWindExample } from "../components/CardTailWindExample";
import { TextField } from "../components/TextField";
// import { TextField, CardTailWindExample, Button } from "../components/__index.tsx";

const Input = () => <input tw="border hover:border-red-50 text-red-500" />;

const Home: NextPage = () => {
  return (
    <div tw="bg-black h-screen text-white">
      <Head>
        <title>Oyelowo Template</title>
        <meta name="description" content="By Oyelowo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        Home of grind!
        <TextField label="Oyelowo" description="The sweet field" errorMessage="Bad error" />
        <CardTailWindExample />
        Separate
        <Input />
        rerere
        <Button>Find btn</Button>
      </main>
      

      <footer>
        <a href="https://codebreather.com" target="_blank" rel="noopener noreferrer">
          Powered by Code breather
        </a>
      </footer>
    </div>
  );
};

export default Home;
