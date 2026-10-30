"use client";

import { useState } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { PixelAvatar } from "@/components/pixel/sprites";

export function ConsolePhoto() {
  const [failed, setFailed] = useState(false);
  if (failed || !profile.github.avatar) {
    return <PixelAvatar className="avatar" title="Pixel portrait of Vanshika" />;
  }
  return (
    <Image
      src={profile.github.avatar}
      alt="GitHub profile photo of Vanshika Nimwal. The resume did not include a portrait."
      width={160}
      height={160}
      className="pixel-photo"
      onError={() => setFailed(true)}
    />
  );
}
