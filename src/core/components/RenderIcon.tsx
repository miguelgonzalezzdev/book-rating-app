import { JSX } from "react";
import { HatIcon } from "../icons/HatIcon";
import { GhostIcon } from "../icons/GhostIcon";
import { SwordIcon } from "../icons/SwordIcon";
import { PlanetIcon } from "../icons/PlanetIcon";
import { MapIcon } from "../icons/MapIcon";
import { CastleIcon } from "../icons/CastleIcon";
import { CrownIcon } from "../icons/CrownIcon";
import { BooksIcon } from "../icons/BooksIcon";
import { FeatherIcon } from "../icons/FeatherIcon";
import { TaleIcon } from "../icons/TaleIcon";
import { HappyIcon } from "../icons/HappyIcon";
import { HeartsIcon } from "../icons/HeartsIcon";
import { MasksIcon } from "../icons/MasksIcon";
import { PeopleIcon } from "../icons/PeopleIcon";
import { SpiderIcon } from "../icons/SpiderIcon";
import { HorseIcon } from "../icons/HorseIcon";

interface RenderIconProps {
    icon: string;
    width?: number;
    height?: number;
    className?: string;
}

export function RenderIcon({ icon, width = 24, height = 24, className = '' }: RenderIconProps) {

    const ICONS: Record<string, JSX.Element> = {
        'HatIcon': <HatIcon width={width} height={height} className={className}/>,
        'GhostIcon': <GhostIcon width={width} height={height} className={className}/>,
        'SwordIcon': <SwordIcon width={width} height={height} className={className}/>,
        'PlanetIcon': <PlanetIcon width={width} height={height} className={className}/>,
        'MapIcon': <MapIcon width={width} height={height} className={className}/>,
        'CastleIcon': <CastleIcon width={width} height={height} className={className}/>,
        'CrownIcon': <CrownIcon width={width} height={height} className={className}/>,
        'BooksIcon': <BooksIcon width={width} height={height} className={className}/>,
        'FeatherIcon': <FeatherIcon width={width} height={height} className={className}/>,
        'TaleIcon': <TaleIcon width={width} height={height} className={className}/>,
        'HappyIcon': <HappyIcon width={width} height={height} className={className}/>,
        'HeartsIcon': <HeartsIcon width={width} height={height} className={className}/>,
        'MasksIcon': <MasksIcon width={width} height={height} className={className}/>,
        'PeopleIcon': <PeopleIcon width={width} height={height} className={className}/>,
        'SpiderIcon': <SpiderIcon width={width} height={height} className={className}/>,
        'HorseIcon': <HorseIcon width={width} height={height} className={className}/>,
    }

    const getIcon = (icon: string) => {
        return ICONS[icon] || "";
    }

    return (
        <>
            {getIcon(icon)}
        </>
    )
}