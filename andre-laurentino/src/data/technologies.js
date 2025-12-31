import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaSass, FaVuejs, FaAngular,
    FaNodeJs, FaPhp, FaLaravel, FaWordpress, FaDatabase, FaJava, FaPython,
    FaAws, FaGitAlt, FaGithub
} from 'react-icons/fa';
import {
    SiAdobe, SiFigma, SiCanva, SiJquery, SiTailwindcss, SiStylus, SiSvelte,
    SiHandlebarsdotjs, SiMysql, SiNestjs, SiMongodb, SiFirebase, SiDotnet,
    SiDatadog
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

export const technologies = [
    {
        title: 'Design',
        items: [
            { name: 'Adobe', icon: SiAdobe },
            { name: 'Figma', icon: SiFigma },
            { name: 'Canva', icon: SiCanva },
            { name: 'Corel', icon: null },
        ]
    },
    {
        title: 'Front-end',
        items: [
            { name: 'HTML', icon: FaHtml5 },
            { name: 'CSS', icon: FaCss3Alt },
            { name: 'JS', icon: FaJs },
            { name: 'NodeJS', icon: FaNodeJs },
            { name: 'React', icon: FaReact },
            { name: 'jQuery', icon: SiJquery },
            { name: 'Bootstrap', icon: FaBootstrap },
            { name: 'Tailwind', icon: SiTailwindcss },
            { name: 'Stylus', icon: SiStylus },
            { name: 'Sass', icon: FaSass },
            { name: 'Vue', icon: FaVuejs },
            { name: 'Angular', icon: FaAngular },
            { name: 'Svelte', icon: SiSvelte },
            { name: 'Handlebars', icon: SiHandlebarsdotjs },
        ]
    },
    {
        title: 'Back-end',
        items: [
            { name: 'PHP', icon: FaPhp },
            { name: 'Laravel', icon: FaLaravel },
            { name: 'WordPress', icon: FaWordpress },
            { name: 'MySQL', icon: SiMysql },
            { name: 'SQL', icon: FaDatabase },
            { name: 'Nest', icon: SiNestjs },
            { name: 'Java', icon: FaJava },
            { name: 'MongoDB', icon: SiMongodb },
            { name: 'Firebase', icon: SiFirebase },
            { name: '.NET', icon: SiDotnet },
            { name: 'Python', icon: FaPython },
        ]
    },
    {
        title: 'DevOps & Outros',
        items: [
            { name: 'AWS', icon: FaAws },
            { name: 'Azure', icon: VscAzure },
            { name: 'Git', icon: FaGitAlt },
            { name: 'GitHub', icon: FaGithub },
            { name: 'DataDog', icon: SiDatadog },
        ]
    }
];
