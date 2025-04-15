"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";

import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, SearchIcon } from "@/components/icons";
import { useDisclosure } from "@heroui/react";
import ModalComponent from "./Modal";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchInput = (
    <Input
      aria-label="Search"
      className="w-full"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm cursor-pointer",
      }}
      endContent={
        <Kbd className="inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      readOnly
    />
  );

  return (
    <>
      {/* 📱 Mobile Search (بالای صفحه در موبایل) */}
      <div onClick={onOpen} className="block w-[80%] mx-auto md:hidden px-4 mt-8 pt-4">{searchInput}</div>

      <HeroUINavbar className="mx-auto w-full md:w-[85%] pt-3">
        <NavbarContent className="hidden md:flex" justify="end">
          {/* 🖥️ Desktop Search */}
          <NavbarItem onClick={onOpen} className="cursor-pointer">
            {searchInput}
          </NavbarItem>
          <ModalComponent isOpen={isOpen} onOpenChange={onClose} />

          {/* 🖥️ Theme + Github */}
          <NavbarItem className="border p-2 rounded-lg border-gray-400 flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem>
            <Button
              isExternal
              as={Link}
              className="text-sm font-normal text-white dark:text-black bg-default-800"
              color="primary"
              href="https://github.com/amirabbasghhh/weather-app"
              variant="solid"
            >
              <GithubIcon className="text-white dark:text-black" />
              Source Code
            </Button>
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>

      {/* 📱 Mobile: Theme + GitHub Fixed Bottom */}
      <div className="md:hidden fixed bottom-0 right-0 w-full flex  items-center gap-x-5  p-4 z-50">
        <div className="dark:bg-white bg-black text-white p-2 rounded-xl dark:text-black">
          <ThemeSwitch />
        </div>
        <Button
          isExternal
          as={Link}
          className="text-sm font-normal text-white dark:text-black bg-default-800"
          color="primary"
          href="https://github.com/amirabbasghhh/weather-app"
          variant="solid"
        >
          <GithubIcon className="text-white dark:text-black" />
          Source Code
        </Button>
      </div>

      <ModalComponent isOpen={isOpen} onOpenChange={onClose} />
    </>
  );
};
