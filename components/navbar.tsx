"use client"
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, SearchIcon } from "@/components/icons";
import { useDisclosure } from "@heroui/react";
import ModalComponent from "./Modal";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm cursor-pointer",
        
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
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
    <HeroUINavbar className="mx-auto w-[85%] pt-3" position="static">
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem onClick={onOpen} className="hidden cursor-pointer lg:flex">{searchInput}</NavbarItem>
        <ModalComponent isOpen={isOpen} onOpenChange={onClose} />
        {/* <CitySearch/> */}
        <NavbarItem className="hidden border p-2 rounded-lg border-gray-400 sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-white dark:text-black bg-default-800"
            color="primary"
            href={siteConfig.links.sponsor}
            variant="solid"
          >
            <GithubIcon className="text-white dark:text-black" />
            Source Code
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
