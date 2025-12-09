import { jsx as _jsx } from "react/jsx-runtime";
// src/pages/CoursesData.tsx
import { FaPaintBrush, FaShieldAlt, FaChartLine, FaCode, FaMobileAlt } from 'react-icons/fa';
import { Scroll, Languages, FlaskConical } from 'lucide-react';
const faPaintBrush = _jsx(FaPaintBrush, {});
const faShieldAlt = _jsx(FaShieldAlt, {});
const faChartLine = _jsx(FaChartLine, {});
const faCode = _jsx(FaCode, {});
const faMobileAlt = _jsx(FaMobileAlt, {});
export const SECTIONS = [
    {
        id: 'graphic',
        title: 'Graphic Design',
        icon: faPaintBrush,
        courses: [
            {
                id: 8,
                title: 'Visual Communication Sketching',
                description: 'Students will be learning how to quickly put down the idea on paper by simplifying objects using organic shapes such as animal, insect, reptile, and more.',
                thumbnail: 'https://i.ytimg.com/vi/7dCG8B2BQbk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDwkMLTii6Z0fdKhWsH_MEy9s63cg',
                instructor: ' Nathan Cooke',
                rating: 4.2,
                students: 14696,
                duration: '1 hour',
                level: 'Beginners ',
                price: 'Free',
                modules: 12,
                certificate: true,
                overview: ' It is extremely helpful in solving problems that are ill-defined or unknown. Design Thinking is an iterative method that helps resolve user issues or redefines problems in alternative strategies and and even a full logo design process at the very end and techniques used by professionals worldwide.',
                requirements: [
                    'No prior experience needed'
                ],
                whatYouLearn: [
                    'What is design thinking',
                    'DT and agile',
                    'Steps of design thinking',
                    'Five phases and four pillars of design thinking '
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Scale',
                        duration: '01:24',
                        videoUrl: 'https://www.youtube.com/embed/7dCG8B2BQbk?start=0',
                        completed: false,
                        description: 'Understanding the concept of scale in design or drawing.'
                    },
                    {
                        id: 2,
                        title: 'Medium Contrast',
                        duration: '14:02',
                        videoUrl: 'https://www.youtube.com/embed/7dCG8B2BQbk?start=84',
                        completed: false,
                        description: 'Exploring the use of medium contrast in visual compositions.'
                    },
                    {
                        id: 3,
                        title: 'Questions',
                        duration: '05:20',
                        videoUrl: 'https://www.youtube.com/embed/7dCG8B2BQbk?start=928',
                        completed: false,
                        description: 'Addressing common questions or discussing key inquiries related to the topic.'
                    },
                    {
                        id: 4,
                        title: 'Core Shadow',
                        duration: '00:00',
                        videoUrl: 'https://www.youtube.com/embed/7dCG8B2BQbk?start=1248',
                        completed: false,
                        description: 'Focusing on the concept and application of core shadows in rendering.'
                    }
                ],
                reviews: [
                    {
                        student: "sara haidar",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                        rating: 3,
                        comment: "Clear and Easy.",
                        date: "2021-2-7"
                    },
                    {
                        student: "lora clone",
                        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=100&h=100&fit=crop&crop=face",
                        rating: 4.5,
                        comment: " Highly recommend!",
                        date: "2020-11-2"
                    }
                ],
                progress: 40,
                courseLinks: []
            },
            {
                id: 7,
                title: 'Design Thinking Process',
                description: 'In this design thinking tutorial, we will be looking at what is design thinking, why design thing is important,  steps of design thinking, empathy mapping.',
                thumbnail: 'https://www.blueoceanacademy.com/wp-content/uploads/2021/07/1_y3HAPVB8jmWabwvzroKaIg.png',
                instructor: 'Simplilearn',
                rating: 4.5,
                students: 500303,
                duration: '40 Minutes',
                level: 'Beginners ',
                price: 'Free',
                modules: 12,
                certificate: true,
                overview: ' It is extremely helpful in solving problems that are ill-defined or unknown. Design Thinking is an iterative method that helps resolve user issues or redefines problems in alternative strategies and and even a full logo design process at the very end and techniques used by professionals worldwide.',
                requirements: [
                    'No prior experience needed',
                    'Adobe Photoshop (any version)',
                    'Windows or Mac computer'
                ],
                whatYouLearn: [
                    'What is design thinking',
                    'DT and agile',
                    'Steps of design thinking',
                    'Five phases and four pillars of design thinking '
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'What is design thinking',
                        duration: '07:42',
                        videoUrl: 'https://www.youtube.com/embed/4nTh3AP6knM?start=0',
                        completed: false,
                        description: 'An introduction to the core concepts and principles of design thinking.'
                    },
                    {
                        id: 2,
                        title: 'DT process',
                        duration: '09:16',
                        videoUrl: 'https://www.youtube.com/embed/4nTh3AP6knM?start=462',
                        completed: false,
                        description: 'A detailed overview of the design thinking process, step-by-step.'
                    },
                    {
                        id: 3,
                        title: 'DT steps',
                        duration: '10:42',
                        videoUrl: 'https://www.youtube.com/embed/4nTh3AP6knM?start=1018',
                        completed: false,
                        description: 'Breakdown of individual stages within the design thinking framework.'
                    },
                    {
                        id: 4,
                        title: 'Empathy mapping',
                        duration: '05:20',
                        videoUrl: 'https://www.youtube.com/embed/4nTh3AP6knM?start=1640',
                        completed: false,
                        description: 'Learn how to create and utilize empathy maps to understand user needs.'
                    },
                    {
                        id: 5,
                        title: 'DT and agile',
                        duration: '00:00',
                        videoUrl: 'https://www.youtube.com/embed/4nTh3AP6knM?start=1960',
                        completed: false,
                        description: 'Explore the integration and synergy between design thinking and agile methodologies.'
                    }
                ],
                reviews: [
                    {
                        student: "Reem Nasir",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                        rating: 5,
                        comment: "Best Photoshop course I've ever taken. Clear and practical.",
                        date: "2024-9-17"
                    },
                    {
                        student: "Lara Hamzeh",
                        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=100&h=100&fit=crop&crop=face",
                        rating: 4.5,
                        comment: "The instructor is amazing. Highly recommend!",
                        date: "2024-11-27"
                    }
                ],
                progress: 40
            },
            {
                id: 6,
                title: 'Logo Design Course',
                description: ' logo design, and it is jam-packed with tips and tricks for you and your logo design workflow.',
                thumbnail: 'https://i.ytimg.com/vi/l9_BM1opTj8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA5JpOG18PvZXrbQnjIfKQV6xBFxw',
                instructor: 'Satori Graphics',
                rating: 4.0,
                students: 500303,
                duration: '1 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 12,
                certificate: true,
                overview: 'You will learn key skill sin logo design psychology, logotype theory, shape psychology, Adobe Illustrator tips for designing logos, and even a full logo design process at the very end and techniques used by professionals worldwide.',
                requirements: [
                    'No prior experience needed',
                    'Adobe Photoshop (any version)',
                    'Windows or Mac computer'
                ],
                whatYouLearn: [
                    'Master all Logo tools and features',
                    'Design stunning Logo',
                    'Prepare Logo for print and web',
                    'Work with layers, masks, and blend modes'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Logo Font Psychology',
                        duration: '04:25',
                        videoUrl: 'https://www.youtube.com/embed/l9_BM1opTj8?start=0',
                        completed: false,
                        description: 'Understand the psychological impact of different fonts in logo design.'
                    },
                    {
                        id: 2,
                        title: 'Logo Design Categories',
                        duration: '04:46',
                        videoUrl: 'https://www.youtube.com/embed/l9_BM1opTj8?start=265',
                        completed: false,
                        description: 'Explore various categories and styles of effective logo design.'
                    },
                    {
                        id: 3,
                        title: 'Logo Grids',
                        duration: '06:18',
                        videoUrl: 'https://www.youtube.com/embed/l9_BM1opTj8?start=551',
                        completed: false,
                        description: 'Learn how to use grids for precise and balanced logo construction.'
                    },
                    {
                        id: 4,
                        title: 'Logo Design Warning Signs',
                        duration: '07:45',
                        videoUrl: 'https://www.youtube.com/embed/l9_BM1opTj8?start=929',
                        completed: false,
                        description: 'Identify common pitfalls and mistakes to avoid in logo design.'
                    },
                    {
                        id: 5,
                        title: 'Logo Design Shape Tips',
                        duration: '04:15',
                        videoUrl: 'https://www.youtube.com/embed/l9_BM1opTj8?start=1394',
                        completed: false,
                        description: 'Discover tips and tricks for using shapes effectively in logo creation.'
                    },
                    {
                        id: 6,
                        title: 'Shape Builder Tool & Logo Design',
                        duration: '05:22',
                        videoUrl: 'https://www.youtube.com/embed/l9_BM1opTj8?start=1649',
                        completed: false,
                        description: 'Master the Shape Builder Tool for intricate logo designs.'
                    },
                    {
                        id: 7,
                        title: 'Offset Path Tool & Logo Design',
                        duration: '06:47',
                        videoUrl: 'https://www.youtube.com/embed/l9_BM1opTj8?start=1971',
                        completed: false,
                        description: 'Utilize the Offset Path Tool to refine and enhance your logo designs.'
                    },
                    {
                        id: 8,
                        title: 'Helpful Illustrator Logo Tips',
                        duration: '10:02',
                        videoUrl: 'https://www.youtube.com/embed/l9_BM1opTj8?start=2388',
                        completed: false,
                        description: 'Get essential tips and tricks for designing logos in Adobe Illustrator.'
                    },
                    {
                        id: 9,
                        title: 'Full Logo Design Process',
                        duration: '00:00',
                        videoUrl: 'https://www.youtube.com/embed/l9_BM1opTj8?start=2989',
                        completed: false,
                        description: 'A comprehensive walkthrough of the entire logo design process from start to finish.'
                    }
                ],
                reviews: [
                    {
                        student: "Reem Nasir",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                        rating: 5,
                        comment: "Best Photoshop course I've ever taken. Clear and practical.",
                        date: "2024-9-17"
                    },
                    {
                        student: "Lara Hamzeh",
                        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=100&h=100&fit=crop&crop=face",
                        rating: 4.5,
                        comment: "The instructor is amazing. Highly recommend!",
                        date: "2024-11-27"
                    }
                ],
                progress: 40
            },
            {
                id: 1,
                title: 'Complete Photoshop Masterclass',
                description: 'Master every tool and technique in Adobe Photoshop from beginner to professional level.',
                thumbnail: 'https://zenoxerp.com/Documents/e799f62c-24cc-48c9-930f-56f32c2c7dc1/Grade/LMS/Thumbnail/CourseThumbnil_502271592023.png',
                instructor: 'Sarah Johnson',
                rating: 4.8,
                students: 12547,
                duration: '32 hours',
                level: 'Beginner to Advanced',
                price: 'Free',
                modules: 12,
                certificate: true,
                overview: 'This comprehensive Photoshop course will take you from complete beginner to advanced user. Learn industry-standard techniques used by professionals worldwide.',
                requirements: [
                    'No prior experience needed',
                    'Adobe Photoshop (any version)',
                    'Windows or Mac computer'
                ],
                whatYouLearn: [
                    'Master all Photoshop tools and features',
                    'Create professional photo manipulations',
                    'Design stunning digital artwork',
                    'Prepare images for print and web',
                    'Work with layers, masks, and blend modes',
                    'Color correction and grading techniques'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Introduction to Photoshop Interface',
                        duration: '15:30',
                        videoUrl: 'https://www.youtube.com/embed/IyR_uYsRdPs',
                        completed: false,
                        description: 'Get familiar with the Photoshop workspace, panels, and essential tools.'
                    },
                    {
                        id: 2,
                        title: 'Working with Layers',
                        duration: '22:15',
                        videoUrl: 'https://www.youtube.com/embed/z2bcqL0FI_4',
                        completed: false,
                        description: 'Learn the fundamentals of layers - the backbone of Photoshop editing.'
                    },
                    {
                        id: 3,
                        title: 'Selection Tools Mastery',
                        duration: '18:45',
                        videoUrl: 'https://www.youtube.com/embed/YNClGWGOgQU',
                        completed: false,
                        description: 'Master all selection tools for precise editing and manipulation.'
                    },
                    {
                        id: 4,
                        title: 'Color Correction Techniques',
                        duration: '25:20',
                        videoUrl: 'https://www.youtube.com/embed/3Kq1MIfTWCE',
                        completed: false,
                        description: 'Professional color correction and grading methods.',
                        quiz: {
                            questions: [
                                {
                                    question: "What is the shortcut for the Move Tool?",
                                    options: ["V", "M", "T", "B"],
                                    correct: 0
                                },
                                {
                                    question: "Which panel controls layer visibility?",
                                    options: ["History", "Layers", "Properties", "Paths"],
                                    correct: 1
                                }
                            ]
                        }
                    },
                    {
                        id: 5,
                        title: 'Photo Manipulation Project',
                        duration: '35:10',
                        videoUrl: 'https://www.youtube.com/embed/hxhqfE2wlE8',
                        completed: false,
                        description: 'Create a stunning photo manipulation from start to finish.'
                    }
                ],
                reviews: [
                    {
                        student: "Ahmed Ali",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                        rating: 5,
                        comment: "Best Photoshop course I've ever taken. Clear and practical.",
                        date: "2024-12-10"
                    },
                    {
                        student: "Lina Mohamed",
                        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=100&h=100&fit=crop&crop=face",
                        rating: 5,
                        comment: "The instructor is amazing. Highly recommend!",
                        date: "2024-12-05"
                    }
                ],
                progress: 40
            },
            {
                id: 2,
                title: 'Illustrator Full Course Tutorial',
                description: 'Create stunning vector graphics, logos, and illustrations with industry-standard techniques.',
                thumbnail: 'https://i.ytimg.com/vi/3RTqLQ1MaQU/maxresdefault.jpg',
                instructor: 'Mike Chen',
                rating: 4.9,
                students: 8932,
                duration: '6 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 10,
                certificate: true,
                overview: 'Master Adobe Illustrator and create professional vector graphics, logos, and illustrations that scale to any size.',
                requirements: [
                    'Basic computer skills',
                    'Adobe Illustrator installed',
                    'Creative mindset'
                ],
                whatYouLearn: [
                    'Create vector graphics and logos',
                    'Master the Pen tool',
                    'Design business cards and branding',
                    'Work with typography',
                    'Create illustrations and icons',
                    'Prepare files for print and web'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Introduction',
                        duration: '0:03',
                        videoUrl: 'https://www.youtube.com/embed/3RTqLQ1MaQU?start=3',
                        completed: false,
                        description: 'Introduction to the course.'
                    },
                    {
                        id: 2,
                        title: 'Customizing the Workspace',
                        duration: '1:20',
                        videoUrl: 'https://www.youtube.com/embed/3RTqLQ1MaQU?start=80',
                        completed: false,
                        description: 'Learn how to customize the workspace.'
                    },
                    {
                        id: 3,
                        title: 'Panels',
                        duration: '10:45',
                        videoUrl: 'https://www.youtube.com/embed/3RTqLQ1MaQU?start=645',
                        completed: false,
                        description: 'Overview of panels and their usage.'
                    },
                    {
                        id: 4,
                        title: 'Vector vs Bitmap',
                        duration: '20:14',
                        videoUrl: 'https://www.youtube.com/embed/3RTqLQ1MaQU?start=1214',
                        completed: false,
                        description: 'Difference between vector and bitmap graphics.'
                    },
                    {
                        id: 5,
                        title: 'Creating New Documents',
                        duration: '24:15',
                        videoUrl: 'https://www.youtube.com/embed/3RTqLQ1MaQU?start=1455',
                        completed: false,
                        description: 'How to create new documents in Illustrator.'
                    }
                ],
                reviews: [
                    {
                        student: "Omar Tarek",
                        avatar: "https://images.unsplash.com/photo-1565992441154-43b2e856871c?w=100&h=100&fit=crop&crop=face",
                        rating: 5,
                        comment: "Pen tool finally makes sense after this course!",
                        date: "2024-12-12"
                    }
                ],
                progress: 75
            },
            {
                id: 3,
                title: 'Brand Identity Design Bootcamp',
                description: 'Learn to create comprehensive brand identities from concept to final delivery.',
                thumbnail: 'https://static.skillshare.com/uploads/video/thumbnails/929bcb7a4d5c2e96697e32a759fc3ff8/original',
                instructor: 'Emma Rodriguez',
                rating: 4.7,
                students: 5647,
                duration: '24 hours',
                level: 'Advanced',
                price: 'Free',
                modules: 8,
                certificate: true,
                overview: 'Complete brand identity design course covering strategy, visual identity, and brand guidelines.',
                requirements: [
                    'Intermediate design skills',
                    'Adobe Creative Suite',
                    'Understanding of design principles'
                ],
                whatYouLearn: [
                    'Brand strategy development',
                    'Logo design process',
                    'Color palette creation',
                    'Typography selection',
                    'Brand guideline creation',
                    'Client presentation skills'
                ],
                lessons: [
                    {
                        id: 9,
                        title: 'Brand Strategy Fundamentals',
                        duration: '20:30',
                        videoUrl: 'https://www.youtube.com/embed/VPvVD8t02U8',
                        completed: false,
                        description: 'Understanding brand positioning and strategy development.'
                    },
                    {
                        id: 10,
                        title: 'Visual Identity Systems',
                        duration: '32:15',
                        videoUrl: 'https://www.youtube.com/embed/WEDIj9JBTC8',
                        completed: false,
                        description: 'Creating cohesive visual identity systems.'
                    }
                ],
                reviews: [],
                progress: 20
            }, {
                id: 4,
                title: 'The Ultimate Guide to Typography ',
                description: 'Good typography is one of the cornerstones of good design',
                thumbnail: 'https://cdn.prod.website-files.com/5d816b07d269382588dbcab1/62b8cbc813d0fa85129ac5c9_20-typography-faqs-letter-anatomy.png',
                instructor: 'Laura Envato',
                rating: 4.8,
                students: 566448,
                duration: '40 Minutes',
                level: 'Beginner to Advanced',
                price: 'Free',
                modules: 12,
                certificate: true,
                overview: 'This comprehensive Photoshop course will take you from complete beginner to advanced user. Learn industry-standard techniques used by professionals worldwide.',
                requirements: [
                    'No prior experience needed',
                    'Windows or Mac computer'
                ],
                whatYouLearn: [
                    'Most basic elements of typography',
                    'Common mistakes through typography',
                    'Complex topics like combining',
                    'Choosing fonts for your projects'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Intro',
                        duration: '01:19',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_1',
                        completed: false,
                        description: 'An introduction to the course material.'
                    },
                    {
                        id: 2,
                        title: 'Brief History of Type',
                        duration: '04:28',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_2',
                        completed: false,
                        description: 'Explore the historical evolution of typography.'
                    },
                    {
                        id: 3,
                        title: 'Typeface vs. Font',
                        duration: '01:27',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_3',
                        completed: false,
                        description: 'Understand the distinction between typeface and font.'
                    },
                    {
                        id: 4,
                        title: 'Type Classification',
                        duration: '09:46',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_4',
                        completed: false,
                        description: 'Learn about different classifications of typefaces.'
                    },
                    {
                        id: 5,
                        title: 'Type Families',
                        duration: '02:48',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_5',
                        completed: false,
                        description: 'Discover how type families are structured and used.'
                    },
                    {
                        id: 6,
                        title: 'Font File Types',
                        duration: '02:44',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_6',
                        completed: false,
                        description: 'Understand various font file formats and their uses.'
                    },
                    {
                        id: 7,
                        title: 'Legibility and Type Anatomy',
                        duration: '02:47',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_7',
                        completed: false,
                        description: 'Explore the factors contributing to legibility and the anatomy of type.'
                    },
                    {
                        id: 8,
                        title: 'Readability and Typesetting Basics',
                        duration: '03:34',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_8',
                        completed: false,
                        description: 'Learn the principles of readability and basic typesetting techniques.'
                    },
                    {
                        id: 9,
                        title: 'Common Typesetting Mistakes',
                        duration: '02:16',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_9',
                        completed: false,
                        description: 'Identify and avoid common typesetting errors.'
                    },
                    {
                        id: 10,
                        title: 'Choosing the Right Fonts',
                        duration: '03:32',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_10',
                        completed: false,
                        description: 'Guidance on selecting appropriate fonts for different projects.'
                    },
                    {
                        id: 11,
                        title: 'Font Combinations',
                        duration: '03:01',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_11',
                        completed: false,
                        description: 'Learn how to effectively combine different fonts.'
                    },
                    {
                        id: 12,
                        title: 'Conclusion',
                        duration: '00:00',
                        videoUrl: 'https://www.youtube.com/embed/your_video_id_12',
                        completed: false,
                        description: 'A concluding summary of the course.'
                    }
                ],
                reviews: [
                    {
                        student: "Ahmed Ali",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                        rating: 5,
                        comment: "Best Photoshop course I've ever taken. Clear and practical.",
                        date: "2024-12-10"
                    },
                    {
                        student: "Lina Mohamed",
                        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=100&h=100&fit=crop&crop=face",
                        rating: 5,
                        comment: "The instructor is amazing. Highly recommend!",
                        date: "2024-12-05"
                    }
                ],
                progress: 40
            }, {
                id: 5,
                title: 'Learn Adobe Photoshop and Poster Design',
                description: 'Focused on mastering Photoshop and crafting effective poster design, taking you from beginner to pro.',
                thumbnail: 'https://i.ytimg.com/vi/3n_tWKBZynk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBqIGP9e3E227NhRiTrZGf0wuKIYw',
                instructor: 'Intellipaat CCSP',
                rating: 4.5,
                students: 15470181,
                duration: '3 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 12,
                certificate: true,
                overview: 'Go from beginner to pro in 23 lessons exploring all the essential Photoshop tools and techniques while learning how to use Photoshop style color and new techniques.',
                requirements: [
                    'No prior experience needed',
                    'Adobe Photoshop (any version)',
                    'Windows or Mac computer'
                ],
                whatYouLearn: [
                    'Master all Photoshop tools and features',
                    'Create professional photo manipulations',
                    'Design stunning digital artwork',
                    'Prepare images for print and web',
                    'Work with layers, masks, and blend modes',
                    'Color correction and grading techniques'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Welcome to the Course',
                        duration: '01:50',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'An introduction and overview of what you’ll learn in this Photoshop course.'
                    },
                    {
                        id: 2,
                        title: 'Getting Started',
                        duration: '01:20',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Set up Photoshop and get familiar with the basics before diving deeper.'
                    },
                    {
                        id: 3,
                        title: 'How Photoshop Layers Work',
                        duration: '08:56',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Understand Photoshop layers and how they are used for building edits.'
                    },
                    {
                        id: 4,
                        title: 'Combining Multiple Images',
                        duration: '08:34',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Learn how to merge multiple images together using layers.'
                    },
                    {
                        id: 5,
                        title: 'Tone Adjustment With Levels',
                        duration: '04:37',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Adjust the brightness and contrast of your image using Levels.'
                    },
                    {
                        id: 6,
                        title: 'Color Adjustment',
                        duration: '04:04',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Fine-tune colors in your image for more vibrant results.'
                    },
                    {
                        id: 7,
                        title: 'Hue Adjustments',
                        duration: '08:21',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Use Hue adjustments to creatively shift and balance colors.'
                    },
                    {
                        id: 8,
                        title: 'How to Work With Type',
                        duration: '11:55',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Add and format text in your designs using Photoshop’s type tool.'
                    },
                    {
                        id: 9,
                        title: 'Warped Type and Type on a Path',
                        duration: '17:40',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Create curved, warped, and path-based text effects.'
                    },
                    {
                        id: 10,
                        title: 'Layer Styles and Effects',
                        duration: '17:29',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Apply shadows, glows, and other effects using layer styles.'
                    },
                    {
                        id: 11,
                        title: 'How to Crop',
                        duration: '07:22',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Crop images effectively for composition and design.'
                    },
                    {
                        id: 12,
                        title: 'Resizing and Resolution',
                        duration: '09:41',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Resize images properly and understand resolution settings.'
                    },
                    {
                        id: 13,
                        title: 'Rectangle and Elliptical Marquee Tool',
                        duration: '06:09',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Master marquee tools for basic selections in Photoshop.'
                    },
                    {
                        id: 14,
                        title: 'Clipping Masks',
                        duration: '04:29',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Use clipping masks to apply edits to specific layers.'
                    },
                    {
                        id: 15,
                        title: 'Quick Selection Tool',
                        duration: '07:51',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Select objects quickly and accurately with the Quick Selection tool.'
                    },
                    {
                        id: 16,
                        title: 'Layer Masks',
                        duration: '06:07',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Learn non-destructive editing with Photoshop layer masks.'
                    },
                    {
                        id: 17,
                        title: 'Select and Mask',
                        duration: '12:13',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Refine selections and cutouts using Select and Mask.'
                    },
                    {
                        id: 18,
                        title: 'Understanding Photoshop Smart Objects',
                        duration: '11:31',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Work with Smart Objects to keep edits flexible and non-destructive.'
                    },
                    {
                        id: 19,
                        title: 'Transforming and Warping Layers',
                        duration: '07:49',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Scale, distort, and warp layers to fit your creative needs.'
                    },
                    {
                        id: 20,
                        title: 'Retouching With the Photoshop Healing Brush',
                        duration: '07:57',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Remove blemishes and imperfections with the Healing Brush.'
                    },
                    {
                        id: 21,
                        title: 'Content-Aware Scale',
                        duration: '08:16',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Resize images intelligently while preserving key elements.'
                    },
                    {
                        id: 22,
                        title: 'Exporting Images',
                        duration: '10:38',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Export your work properly for print, web, and social media.'
                    },
                    {
                        id: 23,
                        title: 'What Next?',
                        duration: '05:00',
                        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
                        completed: false,
                        description: 'Final thoughts and suggestions for continuing your Photoshop journey.'
                    }
                ],
                progress: 40
            }
        ],
        exercises: [
            {
                id: 1,
                title: "Logo Design",
                type: "MCQ",
                difficulty: "Easy",
                duration: "10 min",
                points: 30,
                completed: false,
                questions: [
                    {
                        question: "Why is font choice crucial in logo design?",
                        options: [
                            "Fonts only affect readability, not brand identity",
                            "Fonts communicate mood, personality, and positioning of a brand",
                            "Fonts should always be bold to stand out",
                            "Fonts matter less than color schemes"
                        ],
                        correctAnswer: "Fonts communicate mood, personality, and positioning of a brand"
                    },
                    {
                        question: "Which of the following is NOT a common logo category?",
                        options: [
                            "Wordmark",
                            "Pictorial mark",
                            "Emblem",
                            "Layout mark"
                        ],
                        correctAnswer: "Layout mark"
                    }, {
                        question: "Why is font choice crucial in logo design?",
                        options: [
                            "Fonts only affect readability, not brand identity",
                            "Fonts communicate mood, personality, and positioning of a brand",
                            "Fonts should always be bold to stand out",
                            "Fonts matter less than color schemes"
                        ],
                        correctAnswer: "Fonts communicate mood, personality, and positioning of a brand"
                    },
                    {
                        question: "Which of the following is NOT a common logo category?",
                        options: [
                            "Wordmark",
                            "Pictorial mark",
                            "Emblem",
                            "Layout mark"
                        ],
                        correctAnswer: "Layout mark"
                    },
                    {
                        question: "What is the primary benefit of using a grid system in logo design?",
                        options: [
                            "Ensures logos use fewer colors",
                            "Helps maintain balance, proportion, and consistency",
                            "Makes logos look more abstract",
                            "Replaces the need for sketches"
                        ],
                        correctAnswer: "Helps maintain balance, proportion, and consistency"
                    },
                    {
                        question: "Which of the following is a red flag in logo design?",
                        options: [
                            "Simplicity and clarity",
                            "Overcomplicated details that don’t scale well",
                            "Use of negative space effectively",
                            "Strong typographic hierarchy"
                        ],
                        correctAnswer: "Overcomplicated details that don’t scale well"
                    },
                    {
                        question: "Which shape is often linked with stability and trust in logo design?",
                        options: [
                            "Triangle",
                            "Circle",
                            "Square",
                            "Oval"
                        ],
                        correctAnswer: "Square"
                    }
                ],
            },
            {
                id: 2,
                title: "Brand Strategy Fundamentals",
                type: "MCQ",
                difficulty: "Easy",
                duration: "10 min",
                points: 30,
                completed: false,
                questions: [
                    {
                        question: "What is the main purpose of a brand strategy?",
                        options: [
                            "To design attractive logos",
                            "To create a consistent plan for positioning and growing a brand",
                            "To decide the company’s office layout",
                            "To manage only short-term marketing campaigns"
                        ],
                        correctAnswer: "To create a consistent plan for positioning and growing a brand"
                    },
                    {
                        question: "Which of the following is a key element of brand strategy?",
                        options: [
                            "Pricing of products",
                            "Target audience definition",
                            "Office interior design",
                            "Employee dress code"
                        ],
                        correctAnswer: "Target audience definition"
                    },
                    {
                        question: "Why is brand positioning important?",
                        options: [
                            "It defines where the brand stands in the market compared to competitors",
                            "It helps create office hierarchies",
                            "It ensures only the logo is remembered",
                            "It sets rules for product packaging only"
                        ],
                        correctAnswer: "It defines where the brand stands in the market compared to competitors"
                    },
                    {
                        question: "Which question is MOST relevant when defining brand values?",
                        options: [
                            "What profit margins do we want?",
                            "What principles guide our business decisions?",
                            "Where should our headquarters be located?",
                            "Which software should the design team use?"
                        ],
                        correctAnswer: "What principles guide our business decisions?"
                    },
                    {
                        question: "What role does brand storytelling play in strategy?",
                        options: [
                            "It makes financial reports easier to read",
                            "It builds emotional connections with customers",
                            "It replaces product development",
                            "It reduces the need for advertising"
                        ],
                        correctAnswer: "It builds emotional connections with customers"
                    }
                ],
            },
            {
                id: 4,
                title: "Learn Adobe Photoshop and Poster Design",
                type: "MCQ",
                difficulty: "Easy",
                duration: "10 min",
                points: 30,
                completed: false,
                questions: [
                    {
                        question: "What is typography primarily concerned with?",
                        options: [
                            "Choosing the right colors",
                            "Arranging type to make written language legible, readable, and visually appealing",
                            "Designing illustrations",
                            "Optimizing image resolution"
                        ],
                        correctAnswer: "Arranging type to make written language legible, readable, and visually appealing"
                    },
                    {
                        question: "Which of the following is a serif typeface?",
                        options: [
                            "Times New Roman",
                            "Arial",
                            "Helvetica",
                            "Futura"
                        ],
                        correctAnswer: "Times New Roman"
                    },
                    {
                        question: "What does 'kerning' refer to in typography?",
                        options: [
                            "The vertical spacing between lines of text",
                            "The spacing between individual characters",
                            "The overall size of the typeface",
                            "The boldness of the font"
                        ],
                        correctAnswer: "The spacing between individual characters"
                    },
                    {
                        question: "Which type of alignment is most common for large bodies of text?",
                        options: [
                            "Centered",
                            "Justified",
                            "Left-aligned",
                            "Right-aligned"
                        ],
                        correctAnswer: "Left-aligned"
                    },
                    {
                        question: "Why is hierarchy important in typography?",
                        options: [
                            "It reduces the need for images",
                            "It helps guide the reader’s eye and emphasizes important information",
                            "It makes text look more decorative",
                            "It ensures all text is the same size"
                        ],
                        correctAnswer: "It helps guide the reader’s eye and emphasizes important information"
                    },
                ],
            },
            {
                id: 3,
                title: "Learn Adobe Photoshop and Poster Design",
                type: "MCQ",
                difficulty: "Easy",
                duration: "10 min",
                points: 30,
                completed: false,
                questions: [
                    {
                        question: "Which Photoshop tool is commonly used to remove backgrounds?",
                        options: [
                            "Move Tool",
                            "Pen Tool",
                            "Magic Wand / Select Subject",
                            "Gradient Tool"
                        ],
                        correctAnswer: "Magic Wand / Select Subject"
                    },
                    {
                        question: "What is the main advantage of using layers in Photoshop?",
                        options: [
                            "They make the file size smaller",
                            "They allow non-destructive editing and better organization",
                            "They convert images into vectors",
                            "They automatically adjust brightness and contrast"
                        ],
                        correctAnswer: "They allow non-destructive editing and better organization"
                    },
                    {
                        question: "Which file format should you use to keep Photoshop edits intact?",
                        options: [
                            "JPG",
                            "PNG",
                            "PSD",
                            "GIF"
                        ],
                        correctAnswer: "PSD"
                    },
                    {
                        question: "What is a key principle of effective poster design?",
                        options: [
                            "Using as many fonts and colors as possible",
                            "Clarity in hierarchy and readability from a distance",
                            "Filling every space with text and images",
                            "Avoiding white space completely"
                        ],
                        correctAnswer: "Clarity in hierarchy and readability from a distance"
                    },
                    {
                        question: "Which Photoshop adjustment is best for controlling overall color tone and contrast?",
                        options: [
                            "Hue/Saturation",
                            "Levels & Curves",
                            "Clone Stamp",
                            "Crop Tool"
                        ],
                        correctAnswer: "Levels & Curves"
                    },
                    {
                        question: "In poster design, why is typography critical?",
                        options: [
                            "It determines the size of the poster",
                            "It communicates mood and ensures information is clear",
                            "It reduces the need for images",
                            "It has no real impact on design"
                        ],
                        correctAnswer: "It communicates mood and ensures information is clear"
                    },
                    {
                        question: "What is the recommended resolution for a print poster in Photoshop?",
                        options: [
                            "72 DPI",
                            "150 DPI",
                            "300 DPI",
                            "600 DPI"
                        ],
                        correctAnswer: "300 DPI"
                    }
                ],
            }
        ],
        sharedNotes: [
            {
                id: 1,
                profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
                author: "Alice Wonderland",
                fileType: "PDF",
                title: "Cellular Respiration Cheatsheet",
                rating: 4.5,
                downloads: 1250,
                views: 5600,
                preview: "A concise summary of all stages of cellular respiration, including glycolysis, Krebs cycle, and oxidative phosphorylation. Perfect for quick revisions before exams!",
                uploadDate: "2023-10-26",
                size: "2.5 MB",
                comments: 15,
                tags: ["Biology", "Cells", "Exam Prep"],
                course: "Biology 101",
                fileUrl: "/files/cellular-respiration.pdf",
            },
            {
                id: 2,
                profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
                author: "Bob The Builder",
                fileType: "DOCX",
                title: "Introduction to Calculus - Limits",
                rating: 3.8,
                downloads: 890,
                views: 3100,
                preview: "Easy-to-understand guide on the concept of limits in calculus. Includes solved examples and practice problems.",
                uploadDate: "2023-10-20",
                size: "1.8 MB",
                comments: 8,
                tags: ["Math", "Calculus"],
                course: "Calculus I",
                fileUrl: "/files/intro-to-calculus.docx",
            },
        ],
    },
    {
        id: 'cyber',
        title: 'Cyber Security',
        icon: faShieldAlt,
        courses: [
            {
                id: 1,
                title: 'Fundamentals of Cloud Computing Security',
                description: 'Learn what is Cloud Computing, Roles, Building Blocks of Cloud Computing, Architecture of Cloud Computing and Cloud Security fundamentals',
                thumbnail: 'https://keepitsafephoto.com/wp-content/uploads/2025/04/10.webp',
                instructor: 'Alex Thompson',
                rating: 4.75,
                students: 78281,
                duration: '5 hours',
                level: 'Advanced',
                price: 'Free',
                modules: 15,
                certificate: true,
                overview: 'This is a must-watch session for everyone who wishes to learn cloud security and make a career in it.',
                requirements: [
                    'Basic networking knowledge',
                    'Cloud computing familiarity helpful',
                    'Ethical mindset'
                ],
                whatYouLearn: [
                    'Cloud Computing',
                    ' Cloud security framework',
                    'Data Discovery ',
                    'Types of risks, legislation & compliance',
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Introduction to Cloud Computing',
                        duration: '0:00',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_intro',
                        completed: false,
                        description: 'An overview of what cloud computing is, its benefits, and its impact on modern IT infrastructure.'
                    },
                    {
                        id: 2,
                        title: 'Cloud Concepts',
                        duration: '1:37',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_concepts',
                        completed: false,
                        description: 'Exploration of fundamental cloud characteristics such as on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service.'
                    },
                    {
                        id: 3,
                        title: 'Deployment Models',
                        duration: '43:52',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_deployment',
                        completed: false,
                        description: 'Detailed look at different cloud deployment models: public, private, hybrid, and community clouds, and their respective use cases.'
                    },
                    {
                        id: 4,
                        title: 'Service Category',
                        duration: '45:15',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_service',
                        completed: false,
                        description: 'Understanding the main cloud service categories: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS).'
                    },
                    {
                        id: 5,
                        title: 'Emerging Technologies',
                        duration: '1:11:23',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_emergingtech',
                        completed: false,
                        description: 'Discussion on new and developing technologies within the cloud ecosystem, such as serverless computing, containers, and edge computing.'
                    },
                    {
                        id: 6,
                        title: 'Security Concepts',
                        duration: '1:22:02',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_securityconcepts',
                        completed: false,
                        description: 'Key security principles and challenges inherent to cloud environments, including shared responsibility model and data protection.'
                    },
                    {
                        id: 7,
                        title: 'Secure Cloud Computing Design Principles',
                        duration: '1:52:48',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_secureprinciples',
                        completed: false,
                        description: 'Guidelines and best practices for designing and implementing secure cloud architectures, focusing on defense-in-depth strategies.'
                    },
                    {
                        id: 8,
                        title: 'Legal Framework & Guidelines',
                        duration: '2:24:00',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_legal',
                        completed: false,
                        description: 'Examination of the legal landscape governing cloud services, including compliance requirements and regulatory standards.'
                    },
                    {
                        id: 9,
                        title: 'eDiscovery',
                        duration: '2:28:01',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_ediscovery',
                        completed: false,
                        description: 'An introduction to electronic discovery processes in the cloud, including preservation, collection, and production of electronic data for legal cases.'
                    },
                    {
                        id: 10,
                        title: 'Forensics Requirements',
                        duration: '2:23:28', // Note: This timestamp is earlier than eDiscovery. I've kept it as provided.
                        videoUrl: 'https://www.youtube.com/embed/placeholder_forensics',
                        completed: false,
                        description: 'Understanding the specific requirements and challenges of conducting digital forensics investigations in cloud environments.'
                    },
                    {
                        id: 11,
                        title: 'Standard Privacy Requirements',
                        duration: '2:45:23',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_privacy',
                        completed: false,
                        description: 'Overview of common privacy regulations and standards that impact cloud data handling, such as GDPR and HIPAA.'
                    },
                    {
                        id: 12,
                        title: 'Internal & External Audit',
                        duration: '2:50:33',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_audits',
                        completed: false,
                        description: 'Distinction between internal and external audits in a cloud context, and their roles in ensuring compliance and security.'
                    },
                    {
                        id: 13,
                        title: 'Types of Audit Reports',
                        duration: '2:53:16',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_auditreports',
                        completed: false,
                        description: 'Explanation of various types of audit reports relevant to cloud services, such as SOC reports.'
                    },
                    {
                        id: 14,
                        title: 'Restrictions of Audit Scope Statement',
                        duration: '2:59:43',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_auditscope',
                        completed: false,
                        description: 'Understanding limitations and boundaries when defining the scope of a cloud audit.'
                    },
                    {
                        id: 15,
                        title: 'Internal Information Security Management System',
                        duration: '3:06:15',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_isms',
                        completed: false,
                        description: 'Implementing and maintaining an Information Security Management System (ISMS) within an organization utilizing cloud services.'
                    },
                    {
                        id: 16,
                        title: 'Cloud Data Concepts: Data Dispersion',
                        duration: '3:37:22',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_dataspersion',
                        completed: false,
                        description: 'Exploring how data is distributed and managed across multiple locations and services in the cloud for resilience and performance.'
                    },
                    {
                        id: 17,
                        title: 'Design and Apply Data Security Technologies and Strategies',
                        duration: '4:04:02',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_datasecstrat',
                        completed: false,
                        description: 'Best practices and tools for protecting data at rest, in transit, and in use within cloud environments.'
                    },
                    {
                        id: 18,
                        title: 'Information Rights Management: Appropriate Tools',
                        duration: '4:34:39',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_irm',
                        completed: false,
                        description: 'Utilizing Information Rights Management (IRM) tools to control access to sensitive data and intellectual property in the cloud.'
                    },
                    {
                        id: 19,
                        title: 'Plan and Implement Data Retention, Deletion and Archiving Policies',
                        duration: '4:39:19',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_datapolicies',
                        completed: false,
                        description: 'Developing and executing robust policies for managing the lifecycle of cloud data, from retention to secure deletion and archiving.'
                    },
                    {
                        id: 20,
                        title: 'CCSP Certification',
                        duration: '4:55:15',
                        videoUrl: 'https://www.youtube.com/embed/placeholder_ccsp',
                        completed: false,
                        description: 'An overview of the Certified Cloud Security Professional (CCSP) certification, its domains, and preparation strategies.'
                    },
                ],
                reviews: [],
                progress: 1
            },
            {
                id: 5,
                title: 'Cryptography',
                description: 'Here, you will look into an introduction to cryptography, the importance of cryptography, applications of cryptography, and various methods to employ cryptography in the real world.',
                thumbnail: 'https://www.mebuyukbulut.com/wp-content/uploads/2022/09/kriptoloji-kapak.webp',
                instructor: 'Simplilearn',
                rating: 4.45,
                students: 256086,
                duration: '2.15 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 15,
                certificate: true,
                overview: 'Cryptography is the practice and study of techniques for secure communication in the presence of third parties called adversaries.',
                requirements: [
                    'Mathematics',
                    'Computer Science Fundamentals',
                    'Basic Security Concepts'
                ],
                whatYouLearn: [
                    'Introduction to cryptography',
                    'Network security assessment',
                    'DES and AES Algorithm ',
                    'Hashing',
                    'Symmetric and Asymmetric Key Cryptography',
                    'Secure Hash Algorithm'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Why Is Cryptography Essential',
                        duration: '00:00',
                        videoUrl: 'https://www.youtube.com/embed/example1',
                        completed: false,
                        description: 'Introduction to why cryptography is crucial in cyber security.'
                    },
                    {
                        id: 2,
                        title: 'What is Cryptography',
                        duration: '03:47',
                        videoUrl: 'https://www.youtube.com/embed/example2',
                        completed: false,
                        description: 'Understanding the concept and principles of cryptography.'
                    },
                    {
                        id: 3,
                        title: 'Applications',
                        duration: '05:54',
                        videoUrl: 'https://www.youtube.com/embed/example3',
                        completed: false,
                        description: 'Exploring real-world applications of cryptography.'
                    },
                    {
                        id: 4,
                        title: 'Symmetric Key Cryptography',
                        duration: '08:01',
                        videoUrl: 'https://www.youtube.com/embed/example4',
                        completed: false,
                        description: 'Introduction to symmetric key encryption and its uses.'
                    },
                    {
                        id: 5,
                        title: 'Asymmetric Key Cryptography',
                        duration: '17:14',
                        videoUrl: 'https://www.youtube.com/embed/example5',
                        completed: false,
                        description: 'Learning about asymmetric encryption and public/private keys.'
                    },
                    {
                        id: 6,
                        title: 'Hashing',
                        duration: '24:43',
                        videoUrl: 'https://www.youtube.com/embed/example6',
                        completed: false,
                        description: 'Understanding the concept of hashing and its importance.'
                    },
                    {
                        id: 7,
                        title: 'DES Algorithm',
                        duration: '32:59',
                        videoUrl: 'https://www.youtube.com/embed/example7',
                        completed: false,
                        description: 'Explaining the Data Encryption Standard (DES) algorithm.'
                    },
                    {
                        id: 8,
                        title: 'AES Algorithm',
                        duration: '43:40',
                        videoUrl: 'https://www.youtube.com/embed/example8',
                        completed: false,
                        description: 'Learning about the Advanced Encryption Standard (AES).'
                    },
                    {
                        id: 9,
                        title: 'Digital Signature Algorithm',
                        duration: '57:12',
                        videoUrl: 'https://www.youtube.com/embed/example9',
                        completed: false,
                        description: 'How digital signatures work and their role in security.'
                    },
                    {
                        id: 10,
                        title: 'Rivest-Shamir-Adleman (RSA) Encryption',
                        duration: '01:07:08',
                        videoUrl: 'https://www.youtube.com/embed/example10',
                        completed: false,
                        description: 'Introduction to RSA encryption and its mathematical foundation.'
                    },
                    {
                        id: 11,
                        title: 'MD5 Algorithm',
                        duration: '01:12:55',
                        videoUrl: 'https://www.youtube.com/embed/example11',
                        completed: false,
                        description: 'Understanding the MD5 hashing algorithm and its weaknesses.'
                    },
                    {
                        id: 12,
                        title: 'Secure Hash Algorithm (SHA)',
                        duration: '01:21:40',
                        videoUrl: 'https://www.youtube.com/embed/example12',
                        completed: false,
                        description: 'Overview of the Secure Hash Algorithm family.'
                    },
                    {
                        id: 13,
                        title: 'SSL Handshake',
                        duration: '01:32:46',
                        videoUrl: 'https://www.youtube.com/embed/example13',
                        completed: false,
                        description: 'Explaining the SSL/TLS handshake process for secure communication.'
                    },
                    {
                        id: 14,
                        title: 'Interview Questions',
                        duration: '01:55:41',
                        videoUrl: 'https://www.youtube.com/embed/example14',
                        completed: false,
                        description: 'Common cryptography-related interview questions and answers.'
                    }
                ],
                reviews: [],
                progress: 1
            },
            {
                id: 4,
                title: 'Ethical Hacking Complete Course',
                description: 'the practice of attempting to penetrate a computer system, application, or data, with the authorization of its owner, to identify vulnerabilities that a malicious attacker could exploit.',
                thumbnail: 'https://files.selar.co/product-images/2025/products/chellodigitalstore/from-zero-to-hero-complet-selar.co-679c366148a4c.jpeg',
                instructor: 'Alex Thompson',
                rating: 4.9,
                students: 15623,
                duration: '45 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 15,
                certificate: true,
                overview: 'Complete ethical hacking course covering penetration testing methodologies and security assessment techniques.',
                requirements: [
                    'Basic networking knowledge',
                    'Linux familiarity helpful',
                    'Ethical mindset'
                ],
                whatYouLearn: [
                    'Penetration testing methodologies',
                    'Network security assessment',
                    'Web application security',
                    'Social engineering awareness',
                    'Incident response',
                    'Security reporting'
                ],
                lessons: [
                    {
                        id: 11,
                        title: 'Introduction to Ethical Hacking',
                        duration: '18:30',
                        videoUrl: 'https://www.youtube.com/embed/3Kq1MIfTWCE',
                        completed: false,
                        description: 'Understanding the fundamentals and ethics of penetration testing.'
                    },
                    {
                        id: 12,
                        title: 'Network Reconnaissance',
                        duration: '25:45',
                        videoUrl: 'https://www.youtube.com/embed/hxhqfE2wlE8',
                        completed: false,
                        description: 'Information gathering and network scanning techniques.'
                    }
                ],
                reviews: [],
                progress: 1
            },
            {
                id: 9,
                title: 'Ethical Hacking Deep Dive: Metasploit and Nmap',
                description: 'Tutorial on leveraging Metasploit in Ethical Hacking. It kicks off with a concise explanation of Metasploit’s modules, laying the groundwork for a better understanding of how Metasploit operates',
                thumbnail: 'https://i.ytimg.com/vi/Ft6tLATCIVQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCS8EPEws_9snI1xSb2lcEXTE1Ulg',
                instructor: 'Nielsen Networking',
                rating: 4.9,
                students: 120544,
                duration: '45 minutes',
                level: 'Advanced',
                price: 'Free',
                modules: 15,
                certificate: true,
                overview: 'The tutorial seamlessly transitions to the terminal, guiding you through various Nmap scanning techniques—from network reconnaissance to port and service enumeration on selected targets.',
                requirements: [
                    'Basic networking knowledge',
                    'Linux familiarity helpful',
                    'Ethical mindset'
                ],
                whatYouLearn: [
                    ' Metasploit takes on PostgreSQL, VNC, and NFC services',
                    'Metasploit NFS Permisson Module',
                    ' Reverse shells',
                    'Gaining root access,',
                    'Nmap Network Discovery',
                    'Security reporting'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Introduction',
                        duration: '00:00',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Course introduction and overview of Metasploit and Kali Linux topics.'
                    },
                    {
                        id: 2,
                        title: 'Metasploit Modules',
                        duration: '01:42',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Overview of key Metasploit modules and their purposes.'
                    },
                    {
                        id: 3,
                        title: 'Kali Linux Metasploit Module Location',
                        duration: '05:14',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Where to locate Metasploit modules within Kali Linux OS.'
                    },
                    {
                        id: 4,
                        title: 'Nmap Network Discovery',
                        duration: '07:37',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Using Nmap for discovering hosts and network information.'
                    },
                    {
                        id: 5,
                        title: 'Nmap Targeted Scan and Services Review',
                        duration: '09:45',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Performing targeted scans and analyzing service data using Nmap.'
                    },
                    {
                        id: 6,
                        title: 'Metasploit Login Module for PostgreSQL',
                        duration: '11:58',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Utilizing Metasploit’s PostgreSQL login module for credential testing.'
                    },
                    {
                        id: 7,
                        title: 'Metasploit Database Query',
                        duration: '16:52',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Executing database queries within Metasploit framework sessions.'
                    },
                    {
                        id: 8,
                        title: 'Metasploit Data Exfiltration',
                        duration: '19:39',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Techniques for extracting and exfiltrating data using Metasploit.'
                    },
                    {
                        id: 9,
                        title: 'Cracking Hashes with John The Ripper',
                        duration: '23:28',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Using John the Ripper to crack password hashes obtained during tests.'
                    },
                    {
                        id: 10,
                        title: 'Metasploit Meterpreter Shell for PostgreSQL',
                        duration: '27:18',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Working with the Meterpreter shell against PostgreSQL services.'
                    },
                    {
                        id: 11,
                        title: 'Metasploit VNC Brute Force',
                        duration: '31:09',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Conducting brute-force attacks on VNC using Metasploit.'
                    },
                    {
                        id: 12,
                        title: 'Metasploit NFS Permission Module (Remotely Mount Target Machine)',
                        duration: '36:08',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Using the NFS permission module to remotely mount the target machine.'
                    },
                    {
                        id: 13,
                        title: 'Closing Arguments',
                        duration: '40:34',
                        videoUrl: 'https://youtu.be/Ft6tLATCIVQ',
                        completed: false,
                        description: 'Final summary and closing remarks on Metasploit and usage scenarios.'
                    }
                ],
                reviews: [],
                progress: 1
            },
            {
                id: 8,
                title: 'Web Application Penetration Testing ',
                description: 'Walk through the fundamentals of web application pentesting using real-world examples and tools like Burp Suite, OWASP ZAP, and more',
                thumbnail: 'https://www.stationx.net/wp-content/uploads/2023/12/How-to-Perform-Network-Penetration-Testing.png',
                instructor: 'Hacktrickz',
                rating: 4.0,
                students: 423,
                duration: '10 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 15,
                certificate: true,
                overview: ' looking to refresh your skills, this tutorial covers everything you need to know—from reconnaissance to exploitation.',
                requirements: [
                    'Burp Suite,',
                    'OWASP ZAP',
                    'Nikto',
                    'Dirbuster'
                ],
                whatYouLearn: [
                    'Penetration testing methodologies',
                    'XSS, SQLi, IDOR, etc.',
                    'Nmap',
                    'Bug bounty hunters',
                    'Fundamentals of web application pentesting ',
                    'Security reporting'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Introduction to Web Application Security',
                        duration: '00:00',
                        videoUrl: 'https://youtu.be/ZbfRsTvNFRk',
                        completed: false,
                        description: 'Overview of web application security and its importance in modern software development.'
                    },
                    {
                        id: 2,
                        title: 'OWASP Top 10 Vulnerabilities (XSS, SQLi, IDOR, etc.)',
                        duration: '04:00:00',
                        videoUrl: 'https://youtu.be/ZbfRsTvNFRk',
                        completed: false,
                        description: 'Deep dive into the OWASP Top 10 vulnerabilities with real-world examples.'
                    },
                    {
                        id: 3,
                        title: 'Tools for Web Pentesting (Burp Suite, Nmap, etc.)',
                        duration: '06:00:00',
                        videoUrl: 'https://youtu.be/ZbfRsTvNFRk',
                        completed: false,
                        description: 'Introduction to popular tools used by ethical hackers and penetration testers.'
                    },
                    {
                        id: 4,
                        title: 'Hands-on Examples and Lab Demos',
                        duration: '08:00:00',
                        videoUrl: 'https://youtu.be/ZbfRsTvNFRk',
                        completed: false,
                        description: 'Practical demonstrations of web application vulnerabilities and their exploitation.'
                    },
                    {
                        id: 5,
                        title: 'Pro Tips for Ethical Hackers and Bug Bounty Hunters',
                        duration: '10:00:00',
                        videoUrl: 'https://youtu.be/ZbfRsTvNFRk',
                        completed: false,
                        description: 'Advanced strategies and tips for ethical hacking and bug bounty success.'
                    }
                ],
                reviews: [],
                progress: 1
            },
            {
                id: 7,
                title: 'Introduction to Application Security',
                description: 'In this course, we provide a thorough yet high-level understanding of Application Security concepts.',
                thumbnail: 'https://miro.medium.com/1*o5YmTRviMA2scVXJk2MDiQ.jpeg',
                instructor: 'christoph limpuler',
                rating: 4.8,
                students: 20993,
                duration: '45 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 15,
                certificate: true,
                overview: 'Complete ethical hacking course covering penetration testing methodologies and security assessment techniques.',
                requirements: [
                    'Basic networking knowledge',
                    'Linux familiarity helpful',
                    'Ethical mindset'
                ],
                whatYouLearn: [
                    'Penetration testing methodologies',
                    'Network security assessment',
                    'Web application security',
                    'Social engineering awareness',
                    'Incident response',
                    'Security reporting'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Core Concepts of Application Security (AppSec)',
                        duration: '00:00',
                        videoUrl: 'https://www.youtube.com/embed/example1',
                        completed: false,
                        description: 'Introduction to the essential principles of application security.'
                    },
                    {
                        id: 2,
                        title: 'Important Frameworks & Tools for Secure Software',
                        duration: '20:00',
                        videoUrl: 'https://www.youtube.com/embed/example2',
                        completed: false,
                        description: 'Overview of key frameworks and tools that help developers build secure applications.'
                    },
                    {
                        id: 3,
                        title: 'OWASP for Web & Mobile Applications',
                        duration: '40:00',
                        videoUrl: 'https://www.youtube.com/embed/example3',
                        completed: false,
                        description: 'Exploring OWASP guidelines for securing both web and mobile applications.'
                    },
                    {
                        id: 4,
                        title: 'Cloud Application Security Concepts',
                        duration: '01:00:00',
                        videoUrl: 'https://www.youtube.com/embed/example4',
                        completed: false,
                        description: 'Understanding cloud-native security concepts and best practices for protecting applications in the cloud.'
                    },
                    {
                        id: 5,
                        title: 'Application Security Testing Methodologies',
                        duration: '01:20:00',
                        videoUrl: 'https://www.youtube.com/embed/example5',
                        completed: false,
                        description: 'Learning about different approaches and methodologies for application security testing.'
                    },
                    {
                        id: 6,
                        title: 'Hands-on Pentesting Demonstrations',
                        duration: '01:40:00',
                        videoUrl: 'https://www.youtube.com/embed/example6',
                        completed: false,
                        description: 'Practical demonstrations of penetration testing techniques and tools.'
                    }
                ],
                reviews: [],
                progress: 1
            },
            {
                id: 10,
                title: 'Cybersecurity Assets, Network Threats & Vulnerabilities',
                description: 'In this course, you will explore the concepts of assets, threats, and vulnerabilities. First, you will build an understanding of how assets are classified. ',
                thumbnail: 'https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/11/cybersecurity-logo.jpeg',
                instructor: 'Google Cybersecurity Certificate',
                rating: 4.8,
                students: 146522,
                duration: '2 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 15,
                certificate: true,
                overview: 'Complete ethical hacking course covering penetration testing methodologies and security assessment techniques.',
                requirements: [
                    'Basic networking knowledge',
                    'Linux familiarity helpful',
                    'Ethical mindset'
                ],
                whatYouLearn: [
                    'Penetration testing methodologies',
                    'Network security assessment',
                    'Web application security',
                    'Social engineering awareness',
                    'Incident response',
                    'Security reporting'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Get Started with the Course',
                        duration: '00:00:00',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Welcome and introduction to the asset security course.'
                    },
                    {
                        id: 2,
                        title: 'Introduction to Assets',
                        duration: '00:02:47',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Defining assets and their importance in cyber security.'
                    },
                    {
                        id: 3,
                        title: 'Digital and Physical Assets',
                        duration: '00:13:08',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Exploring the differences and significance of digital vs. physical assets.'
                    },
                    {
                        id: 4,
                        title: 'Risk and Asset Security',
                        duration: '00:16:56',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Understanding risks associated with asset security.'
                    },
                    {
                        id: 5,
                        title: 'Review: Introduction to Asset Security',
                        duration: '00:25:14',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Quick review of asset security basics.'
                    },
                    {
                        id: 6,
                        title: 'Safeguard Information',
                        duration: '00:26:54',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Approaches to safeguarding organizational information.'
                    },
                    {
                        id: 7,
                        title: 'Encryption Methods',
                        duration: '00:32:05',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Introduction to common encryption techniques.'
                    },
                    {
                        id: 8,
                        title: 'Authentication, Authorization, and Accounting',
                        duration: '00:44:38',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Learning about the AAA framework in cyber security.'
                    },
                    {
                        id: 9,
                        title: 'Review: Protect Organizational Assets',
                        duration: '00:56:36',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Review of methods for protecting organizational assets.'
                    },
                    {
                        id: 10,
                        title: 'Flaws in the System',
                        duration: '00:58:10',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Identifying common flaws and weaknesses in systems.'
                    },
                    {
                        id: 11,
                        title: 'Identify System Vulnerabilities',
                        duration: '01:12:44',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Techniques for spotting system vulnerabilities.'
                    },
                    {
                        id: 12,
                        title: 'Cyber Attacker Mindset',
                        duration: '01:16:03',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Understanding the mindset and strategies of cyber attackers.'
                    },
                    {
                        id: 13,
                        title: 'Review: Vulnerabilities in Systems',
                        duration: '01:24:06',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Review of key vulnerabilities within systems.'
                    },
                    {
                        id: 14,
                        title: 'Social Engineering',
                        duration: '01:26:03',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Exploring the risks of social engineering attacks.'
                    },
                    {
                        id: 15,
                        title: 'Malware',
                        duration: '01:36:30',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Introduction to malware types and their impacts.'
                    },
                    {
                        id: 16,
                        title: 'Web-based Exploits',
                        duration: '01:44:54',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Common exploits and vulnerabilities in web applications.'
                    },
                    {
                        id: 17,
                        title: 'Threat Modeling',
                        duration: '01:54:12',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Techniques for identifying and modeling threats.'
                    },
                    {
                        id: 18,
                        title: 'Review: Threats to Asset Security',
                        duration: '02:01:44',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Review of threats and mitigation strategies for asset security.'
                    },
                    {
                        id: 19,
                        title: 'Congratulations on Completing Course 5!',
                        duration: '02:03:22',
                        videoUrl: 'https://youtu.be/Rgl7C0P6NsE',
                        completed: false,
                        description: 'Final thoughts and congratulations on completing the course.'
                    }
                ],
                reviews: [],
                progress: 1
            }, {
                id: 2,
                title: 'Digital Forensics Course',
                description: 'learning about what is Digital Forensic,  Fundamentals of Computer Forensics,Forensic Investigation Processes and IoT Forensics ',
                thumbnail: 'https://i.ytimg.com/vi/SEzeyvqgHzc/maxresdefault.jpg',
                instructor: 'NetCom Learning',
                rating: 4.6,
                students: 33059,
                duration: '2.25 hours',
                level: 'Beginners ',
                price: 'Free',
                modules: 15,
                certificate: true,
                overview: 'This is a must watch video for everyone who wish to upskill their workforce with digital forensic skills and also to those who wish to learn Digital forensics to make a career in it. ',
                requirements: [
                    'Database knowledge',
                    'Network  familiarity'
                ],
                whatYouLearn: [
                    'what is Digital Forensic',
                    'Fundamentals of Computer Forensics',
                    'Malware Forensics',
                    'Forensic Investigation Processes',
                    'Security reporting'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Digital Forensics Course',
                        duration: '00:00',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Introduction to the fundamentals of digital forensics.'
                    },
                    {
                        id: 2,
                        title: 'Understanding Computer Forensic',
                        duration: '21:50',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Exploring the basics of computer forensics and its applications.'
                    },
                    {
                        id: 3,
                        title: 'Types of Cyber Crimes',
                        duration: '22:52',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Overview of common cyber crimes and their classifications.'
                    },
                    {
                        id: 4,
                        title: 'Impact of Cyber Crimes at Organisational Level',
                        duration: '24:16',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Understanding how cyber crimes affect organizations and businesses.'
                    },
                    {
                        id: 5,
                        title: 'Introduction to Digital Evidence',
                        duration: '28:29',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Learning about the role and types of digital evidence in investigations.'
                    },
                    {
                        id: 6,
                        title: 'Roles and Responsibilities of Forensics Investigator',
                        duration: '32:08',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Responsibilities and ethical duties of a digital forensics investigator.'
                    },
                    {
                        id: 7,
                        title: 'Computer Forensics and Legal Compliance',
                        duration: '33:53',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Legal and compliance aspects in computer forensics.'
                    },
                    {
                        id: 8,
                        title: 'Importance of the Forensic Investigator',
                        duration: '35:55',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Why forensic investigators are crucial in digital security.'
                    },
                    {
                        id: 9,
                        title: 'Setting up a Computer Forensic Lab',
                        duration: '38:23',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Steps and requirements for building a forensic lab.'
                    },
                    {
                        id: 10,
                        title: 'Gathering and Organising Information',
                        duration: '42:07',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Techniques for collecting and structuring forensic information.'
                    },
                    {
                        id: 11,
                        title: 'Writing the Investigation Report',
                        duration: '43:37',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'How to create a professional and clear forensic investigation report.'
                    },
                    {
                        id: 12,
                        title: 'What is Booting Process?',
                        duration: '47:24',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Explaining the computer booting process in digital forensics.'
                    },
                    {
                        id: 13,
                        title: 'Data Acquisition Methodology',
                        duration: '57:03',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Methods and best practices for acquiring forensic data.'
                    },
                    {
                        id: 14,
                        title: 'Challenges in Web Applications Forensics',
                        duration: '1:38:35',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Difficulties and techniques in web application forensics.'
                    },
                    {
                        id: 15,
                        title: 'Indicators of a Web Attack',
                        duration: '1:40:54',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Recognizing the main signs of a web-based cyber attack.'
                    },
                    {
                        id: 16,
                        title: 'Web Application Threats',
                        duration: '1:43:36',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Overview of security threats targeting web applications.'
                    },
                    {
                        id: 17,
                        title: 'Introduction to an Email System',
                        duration: '1:52:50',
                        videoUrl: 'https://www.youtube.com/embed/SEzeyvqgHzc',
                        completed: false,
                        description: 'Understanding how email systems work and their role in forensics.'
                    }
                ],
                reviews: [],
                progress: 1
            }
        ],
        exercises: [
            {
                id: 3,
                title: "Cloud Computing Security",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "5 min",
                points: 10,
                completed: false,
                questions: [
                    {
                        question: "What is the main idea of cloud computing?",
                        options: [
                            "Running applications without internet",
                            "Delivering on-demand computing services like servers, storage, and networking over the internet",
                            "Designing faster computer hardware",
                            "Reducing file sizes for storage"
                        ],
                        correctAnswer: "Delivering on-demand computing services like servers, storage, and networking over the internet"
                    },
                    {
                        question: "Which of the following is NOT a core service model of cloud computing?",
                        options: [
                            "IaaS (Infrastructure as a Service)",
                            "PaaS (Platform as a Service)",
                            "SaaS (Software as a Service)",
                            "DaaS (Database as a Service)"
                        ],
                        correctAnswer: "DaaS (Database as a Service)"
                    },
                    {
                        question: "Who is primarily responsible for securing the physical infrastructure in cloud computing?",
                        options: [
                            "Cloud service provider",
                            "End user",
                            "Application developer",
                            "Operating system vendor"
                        ],
                        correctAnswer: "Cloud service provider"
                    },
                    {
                        question: "Which of the following is considered a building block of cloud computing?",
                        options: [
                            "Virtualization",
                            "Spreadsheets",
                            "Blockchain",
                            "Social Media"
                        ],
                        correctAnswer: "Virtualization"
                    },
                    {
                        question: "What are the main components of cloud computing architecture?",
                        options: [
                            "Front-end, back-end, cloud delivery, and network",
                            "Routers and switches only",
                            "Desktop applications",
                            "Email servers"
                        ],
                        correctAnswer: "Front-end, back-end, cloud delivery, and network"
                    },
                    {
                        question: "Which principle best describes cloud security?",
                        options: [
                            "Relying only on providers for protection",
                            "Shared responsibility between provider and customer",
                            "Ignoring authentication for speed",
                            "Using only private networks"
                        ],
                        correctAnswer: "Shared responsibility between provider and customer"
                    },
                ],
            },
            {
                id: 2,
                title: "Digital Forensics",
                type: "MCQ",
                difficulty: "Advanced",
                duration: "8 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "What is the primary goal of digital forensics?",
                        options: [
                            "To design new software applications",
                            "To identify, preserve, analyze, and present digital evidence",
                            "To increase computer speed",
                            "To remove malware from infected systems"
                        ],
                        correctAnswer: "To identify, preserve, analyze, and present digital evidence"
                    },
                    {
                        question: "Which of the following best describes computer forensics?",
                        options: [
                            "Recovering deleted files for personal use",
                            "Applying investigation techniques to computers and digital storage devices",
                            "Designing new computer hardware",
                            "Encrypting data for secure transmission"
                        ],
                        correctAnswer: "Applying investigation techniques to computers and digital storage devices"
                    },
                    {
                        question: "What is the FIRST step in the forensic investigation process?",
                        options: [
                            "Analysis",
                            "Preservation",
                            "Identification",
                            "Presentation"
                        ],
                        correctAnswer: "Identification"
                    },
                    {
                        question: "Why is preservation important in digital forensics?",
                        options: [
                            "It prevents evidence from being altered or destroyed",
                            "It reduces storage costs",
                            "It ensures faster internet speed",
                            "It makes evidence easier to encrypt"
                        ],
                        correctAnswer: "It prevents evidence from being altered or destroyed"
                    },
                    {
                        question: "Which step in the forensic process involves interpreting the data and drawing conclusions?",
                        options: [
                            "Identification",
                            "Analysis",
                            "Preservation",
                            "Collection"
                        ],
                        correctAnswer: "Analysis"
                    },
                    {
                        question: "In IoT forensics, which of the following is a unique challenge?",
                        options: [
                            "Limited connectivity",
                            "Large variety of devices and data formats",
                            "Excessive redundancy of logs",
                            "Lack of encryption requirements"
                        ],
                        correctAnswer: "Large variety of devices and data formats"
                    },
                ],
            },
            {
                id: 3,
                title: "Cryptography",
                type: "MCQ",
                difficulty: "Intermediate",
                duration: "10 min",
                points: 30,
                completed: false,
                questions: [
                    {
                        question: "What is the primary goal of cryptography?",
                        options: [
                            "To increase internet speed",
                            "To secure information by transforming it into unreadable formats for unauthorized users",
                            "To compress files for storage",
                            "To design computer hardware"
                        ],
                        correctAnswer: "To secure information by transforming it into unreadable formats for unauthorized users"
                    },
                    {
                        question: "Which of the following is NOT a core principle of cryptography?",
                        options: [
                            "Confidentiality",
                            "Integrity",
                            "Availability",
                            "Profitability"
                        ],
                        correctAnswer: "Profitability"
                    },
                    {
                        question: "Why is cryptography important in modern communication?",
                        options: [
                            "It reduces file size",
                            "It ensures data privacy, authenticity, and integrity",
                            "It improves screen resolution",
                            "It decreases internet costs"
                        ],
                        correctAnswer: "It ensures data privacy, authenticity, and integrity"
                    },
                    {
                        question: "Which of the following is an example of symmetric key cryptography?",
                        options: [
                            "RSA",
                            "AES",
                            "DSA",
                            "ECC"
                        ],
                        correctAnswer: "AES"
                    },
                    {
                        question: "In asymmetric encryption, how many keys are used?",
                        options: [
                            "One key shared between sender and receiver",
                            "Two keys: a public key and a private key",
                            "Three rotating keys",
                            "No keys are required"
                        ],
                        correctAnswer: "Two keys: a public key and a private key"
                    },
                    {
                        question: "Which of these is a common application of cryptography?",
                        options: [
                            "Search engine optimization",
                            "Secure online banking transactions",
                            "Image editing",
                            "3D modeling"
                        ],
                        correctAnswer: "Secure online banking transactions"
                    },
                    {
                        question: "What does hashing ensure in cryptography?",
                        options: [
                            "Data compression",
                            "Data integrity by producing a fixed-length output",
                            "Faster internet connections",
                            "Automatic encryption and decryption"
                        ],
                        correctAnswer: "Data integrity by producing a fixed-length output"
                    },
                ],
            },
            {
                id: 3,
                title: "Web Application Penetration Testing",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "8 min",
                points: 15,
                completed: false,
                questions: [
                    {
                        question: "What is the main purpose of web application penetration testing?",
                        options: [
                            "To increase website traffic",
                            "To identify and exploit vulnerabilities in web applications before attackers do",
                            "To design user-friendly websites",
                            "To optimize website loading speed"
                        ],
                        correctAnswer: "To identify and exploit vulnerabilities in web applications before attackers do"
                    },
                    {
                        question: "Which framework provides a list of the most critical web application security risks?",
                        options: [
                            "CIS Benchmarks",
                            "OWASP Top 10",
                            "ISO 27001",
                            "NIST Cybersecurity Framework"
                        ],
                        correctAnswer: "OWASP Top 10"
                    },
                    {
                        question: "Which tool is commonly used as an intercepting proxy for web app pentesting?",
                        options: [
                            "Wireshark",
                            "Burp Suite",
                            "Metasploit",
                            "Nmap"
                        ],
                        correctAnswer: "Burp Suite"
                    },
                    {
                        question: "What type of vulnerability allows attackers to inject malicious SQL queries into input fields?",
                        options: [
                            "Cross-Site Scripting (XSS)",
                            "SQL Injection",
                            "Command Injection",
                            "CSRF"
                        ],
                        correctAnswer: "SQL Injection"
                    },
                    {
                        question: "Which vulnerability involves injecting malicious scripts into web pages viewed by other users?",
                        options: [
                            "SQL Injection",
                            "Cross-Site Scripting (XSS)",
                            "Session Hijacking",
                            "Buffer Overflow"
                        ],
                        correctAnswer: "Cross-Site Scripting (XSS)"
                    },
                    {
                        question: "What is the role of OWASP ZAP in penetration testing?",
                        options: [
                            "A network packet analyzer",
                            "An open-source web application security scanner",
                            "A password cracking tool",
                            "A system monitoring tool"
                        ],
                        correctAnswer: "An open-source web application security scanner"
                    },
                    {
                        question: "Which phase of web app pentesting involves gathering details like endpoints, parameters, and technologies?",
                        options: [
                            "Reconnaissance",
                            "Exploitation",
                            "Reporting",
                            "Post-exploitation"
                        ],
                        correctAnswer: "Reconnaissance"
                    },
                    {
                        question: "Which vulnerability occurs when applications fail to properly validate user authentication and sessions?",
                        options: [
                            "Broken Authentication",
                            "Cross-Site Request Forgery",
                            "File Inclusion",
                            "Race Condition"
                        ],
                        correctAnswer: "Broken Authentication"
                    },
                    {
                        question: "What does CSRF (Cross-Site Request Forgery) exploit?",
                        options: [
                            "The trust a user places in a website",
                            "The trust a website places in a user’s browser",
                            "Weak session encryption",
                            "Insufficient logging and monitoring"
                        ],
                        correctAnswer: "The trust a website places in a user’s browser"
                    },
                ],
            },
            {
                id: 3,
                title: "Ethical Hacking",
                type: "MCQ",
                difficulty: "Advanced",
                duration: "12 min",
                points: 35,
                completed: false,
                questions: [
                    {
                        question: "What is the main goal of ethical hacking?",
                        options: [
                            "To illegally gain access to systems",
                            "To identify and fix vulnerabilities before malicious hackers exploit them",
                            "To damage computer systems",
                            "To steal sensitive data"
                        ],
                        correctAnswer: "To identify and fix vulnerabilities before malicious hackers exploit them"
                    },
                    {
                        question: "Which of the following BEST defines ethical hacking?",
                        options: [
                            "Unauthorized penetration into systems",
                            "Authorized testing of systems to improve security",
                            "Developing viruses for system testing",
                            "Breaking into networks without permission"
                        ],
                        correctAnswer: "Authorized testing of systems to improve security"
                    },
                    {
                        question: "Which phase of ethical hacking involves gathering information about the target system?",
                        options: [
                            "Scanning",
                            "Reconnaissance",
                            "Exploitation",
                            "Covering tracks"
                        ],
                        correctAnswer: "Reconnaissance"
                    },
                    {
                        question: "What is a penetration test (pen test)?",
                        options: [
                            "A simulated cyberattack performed to test system defenses",
                            "A process of encrypting sensitive files",
                            "A method of scanning for viruses",
                            "A way to reduce internet bandwidth"
                        ],
                        correctAnswer: "A simulated cyberattack performed to test system defenses"
                    },
                    {
                        question: "Which tool is commonly used for network scanning in ethical hacking?",
                        options: [
                            "Photoshop",
                            "Nmap",
                            "MS Word",
                            "Excel"
                        ],
                        correctAnswer: "Nmap"
                    },
                    {
                        question: "Which type of hacker is authorized to test systems for vulnerabilities?",
                        options: [
                            "Black Hat Hacker",
                            "White Hat Hacker",
                            "Grey Hat Hacker",
                            "Script Kiddie"
                        ],
                        correctAnswer: "White Hat Hacker"
                    },
                    {
                        question: "What does vulnerability assessment focus on?",
                        options: [
                            "Detecting weaknesses in a system without exploiting them",
                            "Destroying malicious files",
                            "Encrypting system data",
                            "Monitoring employee emails"
                        ],
                        correctAnswer: "Detecting weaknesses in a system without exploiting them"
                    },
                    {
                        question: "Which phase of hacking involves actively attempting to exploit vulnerabilities?",
                        options: [
                            "Reconnaissance",
                            "Scanning",
                            "Gaining Access",
                            "Reporting"
                        ],
                        correctAnswer: "Gaining Access"
                    },
                    {
                        question: "Why is reporting important in ethical hacking?",
                        options: [
                            "It helps attackers hide their tracks",
                            "It provides system owners with details of vulnerabilities and fixes",
                            "It reduces file sizes",
                            "It eliminates the need for penetration tests"
                        ],
                        correctAnswer: "It provides system owners with details of vulnerabilities and fixes"
                    },
                    {
                        question: "Which law-related aspect must ethical hackers always follow?",
                        options: [
                            "They must get authorization from the system owner before testing",
                            "They must avoid reporting vulnerabilities",
                            "They should always use black hat techniques",
                            "They are free to hack any system without permission"
                        ],
                        correctAnswer: "They must get authorization from the system owner before testing"
                    }
                ],
            }
        ],
        sharedNotes: []
        // 3am eb3at video t7ta yosal ezza bdek shake el code    tmm hab3t link github
    },
    {
        id: 'web',
        title: 'Web Development',
        icon: faCode,
        courses: [
            {
                id: 3,
                title: 'JavaScript: The Language Itself',
                description: 'is a complete beginner-friendly course that teaches the fundamentals of JavaScript step by step. It runs for nearly 4 hours and is structured into clear chapters, each focusing on a core concept.',
                thumbnail: 'https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/Javascript-co-ban__2__be74112f409f47e9874f0da758c1d7cb.png',
                instructor: 'LearnWebCode',
                rating: 4.4,
                students: 23212,
                duration: '4 hours',
                level: 'Beginners',
                price: 'Free',
                modules: 18,
                certificate: true,
                overview: 'Master React development with modern hooks, state management, and build production-ready applications.',
                requirements: [
                    'HTML fundamentals',
                    ' CSS knowledge',
                    'ES6+ familiarity'
                ],
                whatYouLearn: [
                    'JavaScript components and JSX',
                    'Building full-stack apps',
                    'Testing JavaScript applications',
                    'Deployment strategies'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Intro',
                        duration: '00:43',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Video introduction.'
                    },
                    {
                        id: 2,
                        title: 'The Language Itself',
                        duration: '10:03',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Overview of the language’s nature and structure.'
                    },
                    {
                        id: 3,
                        title: 'Variables',
                        duration: '16:32',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Working with variables.'
                    },
                    {
                        id: 4,
                        title: 'Functions',
                        duration: '19:58',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Defining and using functions.'
                    },
                    {
                        id: 5,
                        title: 'Objects',
                        duration: '20:43',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Understanding objects and their usage.'
                    },
                    {
                        id: 6,
                        title: 'Arrays',
                        duration: '19:47',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Working with arrays.'
                    },
                    {
                        id: 7,
                        title: 'Making Decisions (if)',
                        duration: '18:38',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Conditional logic with if statements.'
                    },
                    {
                        id: 8,
                        title: 'Higher-Order Functions',
                        duration: '18:19',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Using functions that operate on other functions.'
                    },
                    {
                        id: 9,
                        title: 'Returning vs Mutating',
                        duration: '19:38',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Functional patterns: return vs side-effects.'
                    },
                    {
                        id: 10,
                        title: 'Scope & Context',
                        duration: '32:35',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Variable scope and execution context.'
                    },
                    {
                        id: 11,
                        title: 'Misc Info',
                        duration: '22:51',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Various additional information.'
                    },
                    {
                        id: 12,
                        title: 'Web Browser Practice',
                        duration: '27:24',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Practicing coding in the browser.'
                    },
                    {
                        id: 13,
                        title: 'Where To Go From Here',
                        duration: '',
                        videoUrl: 'https://www.youtube.com/embed/mJTeFxSehNA',
                        completed: false,
                        description: 'Next steps after the course.'
                    }
                ],
                reviews: [],
                progress: 60
            }, {
                id: 6,
                title: 'React Complete Developer Course',
                description: 'Build professional React applications with hooks, context, and modern patterns. However, React lets you build user interfaces out of individual pieces called components.',
                thumbnail: 'https://miro.medium.com/v2/resize:fit:1200/1*n7V4Kv9IKpf_UQfxsMsmEA.jpeg',
                instructor: 'Ahmed Hassan',
                rating: 4.8,
                students: 18765,
                duration: '52 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 18,
                certificate: true,
                overview: 'Master React development with modern hooks, state management, and build production-ready applications.',
                requirements: [
                    'JavaScript fundamentals',
                    'HTML & CSS knowledge',
                    'ES6+ familiarity'
                ],
                whatYouLearn: [
                    'React components and JSX',
                    'State management with hooks',
                    'Context API usage',
                    'Building full-stack apps',
                    'Testing React applications',
                    'Deployment strategies'
                ],
                lessons: [
                    {
                        id: 13,
                        title: 'React Fundamentals',
                        duration: '22:30',
                        videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
                        completed: false,
                        description: 'Learn React basics, components, and JSX syntax.'
                    },
                    {
                        id: 14,
                        title: 'State Management with Hooks',
                        duration: '28:15',
                        videoUrl: 'https://www.youtube.com/embed/qwfE7fSVaZM',
                        completed: false,
                        description: 'Master useState, useEffect, and other React hooks.'
                    }
                ],
                reviews: [],
                progress: 60
            },
            {
                id: 2,
                title: 'CSS Course - Needed to Master',
                description: 'In this course we will learn CSS by building a couple applications This guide is all about practical learning. Well focus on the most common CSS properties and their real-world applications',
                thumbnail: 'https://wallpapercave.com/wp/wp14758679.png',
                instructor: ' EDROH',
                rating: 4.6,
                students: 91669,
                duration: '3 hours',
                level: 'Advanced',
                price: 'Free',
                modules: 18,
                certificate: true,
                overview: 'Master CSS development with modern hooks, state management, and build production-ready applications.',
                requirements: [
                    'Html fundamentals',
                    'ES6+ familiarity'
                ],
                whatYouLearn: [
                    'CSS components',
                    'Building Designed app',
                    'learn Animation'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'What we are Building',
                        duration: '04:04',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Introduction to the project and overview of what will be built.'
                    },
                    {
                        id: 2,
                        title: 'Setup',
                        duration: '02:59',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Project setup and preparing the development environment.'
                    },
                    {
                        id: 3,
                        title: 'Selectors',
                        duration: '12:23',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'CSS selectors, classes, IDs, and element targeting.'
                    },
                    {
                        id: 4,
                        title: 'Fonts and Typography',
                        duration: '15:03',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Working with fonts, text styling, and typography best practices.'
                    },
                    {
                        id: 5,
                        title: 'Colors',
                        duration: '09:25',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Color values, background colors, and contrast.'
                    },
                    {
                        id: 6,
                        title: 'Box Model',
                        duration: '17:26',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Understanding margin, padding, border, and content box.'
                    },
                    {
                        id: 7,
                        title: 'Flexbox',
                        duration: '13:26',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Flexbox layout system, alignment, and spacing.'
                    },
                    {
                        id: 8,
                        title: 'Form',
                        duration: '20:45',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Styling forms, inputs, buttons, and form elements.'
                    },
                    {
                        id: 9,
                        title: 'Finalizing App',
                        duration: '20:49',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Completing the app with styles and polish.'
                    },
                    {
                        id: 10,
                        title: 'Second App',
                        duration: '01:00',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Starting the second app project.'
                    },
                    {
                        id: 11,
                        title: 'Flex',
                        duration: '15:42',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'More flexbox examples and layouts.'
                    },
                    {
                        id: 12,
                        title: 'Grid List',
                        duration: '16:47',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Introduction to CSS Grid with a list layout.'
                    },
                    {
                        id: 13,
                        title: 'Simple Grid',
                        duration: '14:12',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Creating a simple grid layout.'
                    },
                    {
                        id: 14,
                        title: 'Medium Grid',
                        duration: '08:27',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Building a medium-level grid layout.'
                    },
                    {
                        id: 15,
                        title: 'Complex Grid',
                        duration: '10:32',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Advanced grid structures and layouts.'
                    },
                    {
                        id: 16,
                        title: 'Absolute Relative Positioning',
                        duration: '12:00',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'CSS positioning techniques with relative and absolute.'
                    },
                    {
                        id: 17,
                        title: 'Responsive',
                        duration: '06:00',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Responsive design with media queries and flexible layouts.'
                    },
                    {
                        id: 18,
                        title: 'Outro',
                        duration: '',
                        videoUrl: 'https://www.youtube.com/embed/0hrJGWrCux0',
                        completed: false,
                        description: 'Course wrap-up and final thoughts.'
                    }
                ],
                reviews: [],
                progress: 60
            }, {
                id: 1,
                title: 'Learn HTML Language - Full Tutorial',
                description: 'Learn HTML in this complete course for beginners. This is an all-in-one beginner tutorial to help you learn web development skills. This course teaches HTML5.',
                thumbnail: 'https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-html/sta-je-html.jpg',
                instructor: 'FreeCodeCamp',
                rating: 4.8,
                students: 3841752,
                duration: '4 hours',
                level: 'Beginners',
                price: 'Free',
                modules: 18,
                certificate: true,
                overview: 'Master Html development with modern hooks, state management, and build production-ready applications.',
                requirements: [
                    'No Requirments Needed '
                ],
                whatYouLearn: [
                    'Base web-development',
                    'Html Knowledge'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Intro',
                        duration: '00:55',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'Course overview and what you will build.'
                    },
                    {
                        id: 2,
                        title: 'Chapter 1 - Getting Started',
                        duration: '19:18',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'Set up files and basic page structure.'
                    },
                    {
                        id: 3,
                        title: 'Chapter 2 - Head Element',
                        duration: '08:49',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'Metadata, title, favicon, and head best practices.'
                    },
                    {
                        id: 4,
                        title: 'Chapter 3 - Text Basics',
                        duration: '20:43',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'Headings, paragraphs, emphasis, and inline elements.'
                    },
                    {
                        id: 5,
                        title: 'Chapter 4 - List Types',
                        duration: '10:10',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'Ordered, unordered, and description lists.'
                    },
                    {
                        id: 6,
                        title: 'Chapter 5 - Add Links',
                        duration: '30:43',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'Anchor tags, absolute vs relative URLs, accessibility.'
                    },
                    {
                        id: 7,
                        title: 'Chapter 6 - Add Images',
                        duration: '30:20',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'img tag, alt text, formats, and responsive images.'
                    },
                    {
                        id: 8,
                        title: 'Chapter 7 - Semantic Tags',
                        duration: '23:55',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'header, nav, main, section, article, footer.'
                    },
                    {
                        id: 9,
                        title: 'Chapter 8 - Create Tables',
                        duration: '15:49',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'table, thead, tbody, th, td, and captions.'
                    },
                    {
                        id: 10,
                        title: 'Chapter 9 - Forms & Inputs',
                        duration: '44:34',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'form, input types, labels, validation, and accessibility.'
                    },
                    {
                        id: 11,
                        title: 'Chapter 10 - HTML Project',
                        duration: '',
                        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
                        completed: false,
                        description: 'Build the final project (continues to the end of the video).'
                    }
                ],
                reviews: [],
                progress: 60
            }
        ],
        exercises: [
            {
                id: 1,
                title: "HTML Basics",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "5 min",
                points: 10,
                completed: false,
                questions: [
                    {
                        question: "Which HTML tag is used to define the largest heading?",
                        options: ["<heading>", "<h6>", "<h1>", "<head>"],
                        correctAnswer: "<h1>"
                    },
                    {
                        question: "Which attribute is used in HTML to provide alternative text for an image?",
                        options: ["src", "alt", "title", "href"],
                        correctAnswer: "alt"
                    },
                    {
                        question: "What does the <a> tag define in HTML?",
                        options: ["An image", "A hyperlink", "A list", "A table row"],
                        correctAnswer: "A hyperlink"
                    },
                    {
                        question: "Which element is used to create an unordered list?",
                        options: ["<ol>", "<ul>", "<li>", "<list>"],
                        correctAnswer: "<ul>"
                    }
                ]
            },
            {
                id: 2,
                title: "CSS Fundamentals",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "7 min",
                points: 15,
                completed: false,
                questions: [
                    {
                        question: "Which CSS property is used to change text color?",
                        options: ["background-color", "color", "font-style", "text-align"],
                        correctAnswer: "color"
                    },
                    {
                        question: "Which of the following is the correct way to select an element with id='main' in CSS?",
                        options: [".main", "main", "#main", "*main"],
                        correctAnswer: "#main"
                    },
                    {
                        question: "Which CSS property controls the size of text?",
                        options: ["font-weight", "text-style", "font-size", "text-transform"],
                        correctAnswer: "font-size"
                    },
                    {
                        question: "What is the default position property of an HTML element?",
                        options: ["relative", "fixed", "static", "absolute"],
                        correctAnswer: "static"
                    }
                ]
            },
            {
                id: 3,
                title: "React.js Essentials",
                type: "MCQ",
                difficulty: "Intermediate",
                duration: "10 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "What does JSX stand for in React?",
                        options: [
                            "JavaScript XML",
                            "Java Standard Extension",
                            "JavaScript Syntax",
                            "Java Extended Source"
                        ],
                        correctAnswer: "JavaScript XML"
                    },
                    {
                        question: "Which hook is used to manage state in a functional component?",
                        options: ["useState", "useEffect", "useContext", "useRef"],
                        correctAnswer: "useState"
                    },
                    {
                        question: "In React, what is the purpose of 'props'?",
                        options: [
                            "To store local component state",
                            "To pass data from parent to child components",
                            "To directly update the DOM",
                            "To define CSS for components"
                        ],
                        correctAnswer: "To pass data from parent to child components"
                    },
                    {
                        question: "Which command is used to create a new React app using Create React App?",
                        options: [
                            "npm install react-app",
                            "npx create-react-app myApp",
                            "npm start react",
                            "npx react-new myApp"
                        ],
                        correctAnswer: "npx create-react-app myApp"
                    }
                ]
            }
        ],
        sharedNotes: []
    },
    {
        id: 'mobile',
        title: 'Mobile Development',
        icon: faMobileAlt,
        courses: [
            {
                id: 19,
                title: 'Swift Programming | FULL COURSE ',
                description: ' this video, we will go through every modern aspect of Swift as a programming language including, variables, constants, functions, structures, classes, protocols. extensions, asynchronous programming, generics and much more.',
                thumbnail: 'https://miro.medium.com/1*0ZVelJVX6bbqgk7Q0uCoiQ.png',
                instructor: 'FreeCodeCamp',
                rating: 4.5,
                students: 479800,
                duration: '7 hour',
                level: 'Beginner',
                price: 'Free',
                modules: 12,
                certificate: true,
                requirements: [
                    'No Requirments Needed '
                ],
                whatYouLearn: [
                    'Swift basics',
                    'Asynchronous programming',
                    ' Enumerations',
                    'Error Handling'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Introduction',
                        duration: '06:49',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=0',
                        completed: false,
                        description: 'Overview and getting started with the course.',
                    },
                    {
                        id: 2,
                        title: 'Variables',
                        duration: '22:57',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=409',
                        completed: false,
                        description: 'Learn how to declare and use variables in Swift.',
                    },
                    {
                        id: 3,
                        title: 'Operators',
                        duration: '17:09',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=1786',
                        completed: false,
                        description: 'Understand Swift operators and their usage.',
                    },
                    {
                        id: 4,
                        title: 'If and else',
                        duration: '18:13',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=2815',
                        completed: false,
                        description: 'Conditional statements to control program flow.',
                    },
                    {
                        id: 5,
                        title: 'Functions',
                        duration: '18:50',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=3908',
                        completed: false,
                        description: 'Define and use functions in Swift.',
                    },
                    {
                        id: 6,
                        title: 'Closures',
                        duration: '28:10',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=5038',
                        completed: false,
                        description: 'Learn about closures and how they work in Swift.',
                    },
                    {
                        id: 7,
                        title: 'Structures',
                        duration: '25:50',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=6728',
                        completed: false,
                        description: 'Create and use structures in Swift.',
                    },
                    {
                        id: 8,
                        title: 'Enumerations',
                        duration: '41:23',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=8278',
                        completed: false,
                        description: 'Define and use enums in Swift.',
                    },
                    {
                        id: 9,
                        title: 'Classes',
                        duration: '25:30',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=10761',
                        completed: false,
                        description: 'Understand classes, inheritance, and OOP basics.',
                    },
                    {
                        id: 10,
                        title: 'Protocols',
                        duration: '22:57',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=12491',
                        completed: false,
                        description: 'Learn Swift protocols and how to use them.',
                    },
                    {
                        id: 11,
                        title: 'Extensions',
                        duration: '12:18',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=13668',
                        completed: false,
                        description: 'Extend existing types with new functionality.',
                    },
                    {
                        id: 12,
                        title: 'Generics',
                        duration: '32:38',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=14406',
                        completed: false,
                        description: 'Understand generics and their power in Swift.',
                    },
                    {
                        id: 13,
                        title: 'Optionals',
                        duration: '20:55',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=16664',
                        completed: false,
                        description: 'Learn how Swift handles null values with Optionals.',
                    },
                    {
                        id: 14,
                        title: 'Error Handling',
                        duration: '45:56',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=17619',
                        completed: false,
                        description: 'Write safe code with Swift error handling.',
                    },
                    {
                        id: 15,
                        title: 'Collections',
                        duration: '37:42',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=20375',
                        completed: false,
                        description: 'Work with arrays, dictionaries, and sets in Swift.',
                    },
                    {
                        id: 16,
                        title: 'Equality and Hashing',
                        duration: '21:29',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=22637',
                        completed: false,
                        description: 'Learn equality, hashing, and their importance.',
                    },
                    {
                        id: 17,
                        title: 'Custom Operators',
                        duration: '12:09',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=23917',
                        completed: false,
                        description: 'Define and use custom operators in Swift.',
                    },
                    {
                        id: 18,
                        title: 'Asynchronous Programming',
                        duration: '13:45',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=24653',
                        completed: false,
                        description: 'Concurrency and async programming in Swift.',
                    },
                    {
                        id: 19,
                        title: 'Outro',
                        duration: '04:00',
                        videoUrl: 'https://www.youtube.com/embed/8Xg7E9shq0U?start=25478',
                        completed: false,
                        description: 'Course summary and closing thoughts.',
                    },
                ],
                reviews: [],
                progress: 0,
                overview: '',
            },
            {
                id: 11,
                title: 'Flutter Tutorial For Beginners',
                description: 'Learn flutter with this Flutter tutorial for beginners 2022. This is the best way to learn flutter from scratch in 3 hours. We start by installing Flutter on Windows and Mac and then you will learn how to actually use Flutter in real life.',
                thumbnail: 'https://onlyflutter.com/wp-content/uploads/2024/04/flutter_site_image_onlyflutter-768x432.png',
                instructor: 'Flutter Mapp',
                rating: 4.4,
                students: 715800,
                duration: '3 hour',
                level: 'Beginner',
                price: 'Free',
                modules: 12,
                certificate: true,
                requirements: [
                    'No Requirments Needed '
                ],
                whatYouLearn: [
                    'Flutter basics',
                    'Format Flutter Document',
                    'StatelessWidget StatefulWidget',
                    'Cheat Sheet'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Format Document',
                        duration: '00:21:56',
                        videoUrl: 'https://www.youtube.com/embed/CD1Y2DmL5JM?start=4916',
                        completed: false,
                        description: 'Automatically format your code for readability.'
                    },
                    {
                        id: 2,
                        title: 'Elements',
                        duration: '00:31:50',
                        videoUrl: 'https://www.youtube.com/embed/CD1Y2DmL5JM?start=5026',
                        completed: false,
                        description: 'Use Center widget to align content centrally.'
                    },
                    {
                        id: 3,
                        title: 'Refactor',
                        duration: '00:41:23',
                        videoUrl: 'https://www.youtube.com/embed/CD1Y2DmL5JM?start=5209',
                        completed: false,
                        description: 'Refactor code for better structure and clarity.'
                    },
                    {
                        id: 4,
                        title: 'Elevated Button',
                        duration: '00:21:55',
                        videoUrl: 'https://www.youtube.com/embed/CD1Y2DmL5JM?start=5824',
                        completed: false,
                        description: 'Learn how to create ElevatedButton widgets.'
                    },
                    {
                        id: 5,
                        title: 'StatelessWidget & StatefulWidget',
                        duration: '00:32:04',
                        videoUrl: 'https://www.youtube.com/embed/CD1Y2DmL5JM?start=6586',
                        completed: false,
                        description: 'Use print statements for debugging in Dart/Flutter.'
                    },
                    {
                        id: 6,
                        title: 'Split Code',
                        duration: '00:55:03',
                        videoUrl: 'https://www.youtube.com/embed/CD1Y2DmL5JM?start=7644',
                        completed: false,
                        description: 'Differentiate between stateless and stateful widgets.'
                    },
                ],
                reviews: [],
                progress: 0,
                overview: '',
            },
            {
                id: 15,
                title: 'Mobile App Development Roadmap',
                description: 'outlines the strategic plan and vision for an application, guiding the entire development lifecycle from ideation to launch and ongoing maintenance. This structured approach ensures efficiency and aligns all stakeholders. ',
                thumbnail: 'https://www.talentelgia.com/blog/wp-content/uploads/2025/05/MObile-App-Development-Roadmap.webp',
                instructor: 'Sarah Kim',
                rating: 4.7,
                students: 9800,
                duration: '40 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 12,
                certificate: true,
                whatYouLearn: [
                    'App development roadmap',
                    'Android & iOS basics',
                    'No-code app building',
                    'React Native crash course',
                    'Publishing your app'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'The Complete App Development Roadmap',
                        duration: '32:10',
                        videoUrl: 'https://www.youtube.com/embed/yye7rSsiV6k',
                        completed: false,
                        description: 'Everything you need to know to become a mobile developer.'
                    },
                    {
                        id: 2,
                        title: 'Build Your Mobile App in 22 Minutes (AI)',
                        duration: '22:15',
                        videoUrl: 'https://www.youtube.com/embed/ADgIkx5NHJ8',
                        completed: false,
                        description: 'Use AI tools to create an app without coding.'
                    },
                    {
                        id: 3,
                        title: 'Android App Development for Beginners',
                        duration: '45:30',
                        videoUrl: 'https://www.youtube.com/embed/FjrKMcnKahY',
                        completed: false,
                        description: 'Start building real Android apps from day one.'
                    },
                    {
                        id: 4,
                        title: 'React Native Crash Course',
                        duration: '180:00',
                        videoUrl: 'https://www.youtube.com/embed/bCpFbERgj7s',
                        completed: false,
                        description: 'Build a full mobile app with React Native in 3 hours.'
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: []
            }, {
                id: 10,
                title: ' Kotlin Crash Course',
                description: 'outlines the strategic plan and vision for an application, guiding the entire development lifecycle from ideation to launch and ongoing maintenance. This structured approach ensures efficiency and aligns all stakeholders. ',
                thumbnail: 'https://checkmarx.com/wp-content/uploads/2019/10/Website-1024x628-1.jpg',
                instructor: 'Sarah Kim',
                rating: 4.1,
                students: 137800,
                duration: '3 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 12,
                certificate: true,
                whatYouLearn: [
                    'ACreating the project using Kotlin',
                    'Kotlin basics'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Introduction',
                        duration: '31:30',
                        videoUrl: 'https://www.youtube.com/embed/dzUc9vrsldM?start=0',
                        completed: false,
                        description: 'Course introduction and overview.'
                    },
                    {
                        id: 2,
                        title: 'Why is Kotlin cool?',
                        duration: '42:27',
                        videoUrl: 'https://www.youtube.com/embed/dzUc9vrsldM?start=90',
                        completed: false,
                        description: 'Learn the key advantages and features of Kotlin.'
                    },
                    {
                        id: 3,
                        title: 'Kotlin Elements',
                        duration: '01:11:18',
                        videoUrl: 'https://www.youtube.com/embed/dzUc9vrsldM?start=237',
                        completed: false,
                        description: 'Step-by-step guide to installing IntelliJ IDEA.'
                    },
                    {
                        id: 4,
                        title: 'Creating the project',
                        duration: '44:05',
                        videoUrl: 'https://www.youtube.com/embed/dzUc9vrsldM?start=315',
                        completed: false,
                        description: 'How to create a new Kotlin project in IntelliJ.'
                    },
                    {
                        id: 5,
                        title: 'Conlusion',
                        duration: '25:00',
                        videoUrl: 'https://www.youtube.com/embed/dzUc9vrsldM?start=560',
                        completed: false,
                        description: 'Write and run your first Kotlin program.'
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: []
            }, {
                id: 10,
                title: ' React Native Tutorial- Build a React Native App',
                description: 'React Native is an open-source UI software framework created by Meta Platforms, Inc. It is used for developing applications for Android, iOS',
                thumbnail: 'https://miro.medium.com/v2/resize:fit:1000/1*ub1DguhAtkCLvhUGuVGr6w.png',
                instructor: 'Programming with Mosh',
                rating: 4.1,
                students: 3546206,
                duration: '2 hours',
                level: 'Beginners',
                price: 'Free',
                modules: 12,
                certificate: true,
                whatYouLearn: [
                    'Build apps for iOS & Android using your web development skills.',
                    'Build apps for Android using your web development skills'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Introduction',
                        duration: '00:00:00',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=0',
                        completed: false,
                        description: 'Course introduction and overview.'
                    },
                    {
                        id: 2,
                        title: 'Prerequisites',
                        duration: '00:02:20',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=140',
                        completed: false,
                        description: 'Requirements before starting with React Native.'
                    },
                    {
                        id: 3,
                        title: 'What is React Native?',
                        duration: '00:02:58',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=178',
                        completed: false,
                        description: 'Explanation of what React Native is.'
                    },
                    {
                        id: 4,
                        title: 'Expo',
                        duration: '00:04:33',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=273',
                        completed: false,
                        description: 'Introduction to Expo framework.'
                    },
                    {
                        id: 5,
                        title: 'Setting up the development environment',
                        duration: '00:06:19',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=379',
                        completed: false,
                        description: 'How to set up React Native development environment.'
                    },
                    {
                        id: 6,
                        title: 'Your First React Native App',
                        duration: '00:09:17',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=557',
                        completed: false,
                        description: 'Creating and running your first app.'
                    },
                    {
                        id: 7,
                        title: 'Running on an iOS simulator',
                        duration: '00:14:38',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=878',
                        completed: false,
                        description: 'How to run the app on iOS simulator.'
                    },
                    {
                        id: 8,
                        title: 'Running on an Android emulator',
                        duration: '00:18:02',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=1082',
                        completed: false,
                        description: 'How to run the app on Android emulator.'
                    },
                    {
                        id: 9,
                        title: 'Running on a physical device',
                        duration: '00:26:48',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=1608',
                        completed: false,
                        description: 'How to run the app on your own device.'
                    },
                    {
                        id: 10,
                        title: 'Logging',
                        duration: '00:27:54',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=1674',
                        completed: false,
                        description: 'Using logs for debugging.'
                    },
                    {
                        id: 11,
                        title: 'Debugging with Chrome',
                        duration: '00:29:16',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=1756',
                        completed: false,
                        description: 'Debugging React Native apps using Chrome.'
                    },
                    {
                        id: 12,
                        title: 'Debugging in VSCode',
                        duration: '00:34:27',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=2067',
                        completed: false,
                        description: 'Debugging React Native apps in VSCode.'
                    },
                    {
                        id: 13,
                        title: 'Publishing',
                        duration: '00:41:39',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=2499',
                        completed: false,
                        description: 'How to publish a React Native app.'
                    },
                    {
                        id: 14,
                        title: 'Fundamental Concepts',
                        duration: '00:46:30',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=2790',
                        completed: false,
                        description: 'Key concepts in React Native.'
                    },
                    {
                        id: 15,
                        title: 'View',
                        duration: '00:48:20',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=2900',
                        completed: false,
                        description: 'Understanding the View component.'
                    },
                    {
                        id: 16,
                        title: 'Text',
                        duration: '00:51:08',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=3068',
                        completed: false,
                        description: 'Using the Text component.'
                    },
                    {
                        id: 17,
                        title: 'Image',
                        duration: '00:53:50',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=3230',
                        completed: false,
                        description: 'Working with images in React Native.'
                    },
                    {
                        id: 18,
                        title: 'Touchables',
                        duration: '00:59:25',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=3565',
                        completed: false,
                        description: 'Interactive components with touch.'
                    },
                    {
                        id: 19,
                        title: 'Button',
                        duration: '01:04:21',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=3861',
                        completed: false,
                        description: 'How to use Button in React Native.'
                    },
                    {
                        id: 20,
                        title: 'Alert',
                        duration: '01:06:01',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=3961',
                        completed: false,
                        description: 'Displaying alerts in apps.'
                    },
                    {
                        id: 21,
                        title: 'StyleSheet',
                        duration: '01:09:55',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=4195',
                        completed: false,
                        description: 'Styling with StyleSheet.'
                    },
                    {
                        id: 22,
                        title: 'Platform-specific code',
                        duration: '01:14:49',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=4489',
                        completed: false,
                        description: 'Writing platform-specific code.'
                    },
                    {
                        id: 23,
                        title: 'Layouts',
                        duration: '01:18:06',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=4686',
                        completed: false,
                        description: 'Understanding layouts.'
                    },
                    {
                        id: 24,
                        title: 'Dimensions',
                        duration: '01:18:43',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=4723',
                        completed: false,
                        description: 'Using Dimensions API.'
                    },
                    {
                        id: 25,
                        title: 'Detecting orientation changes',
                        duration: '01:22:22',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=4942',
                        completed: false,
                        description: 'Handling device orientation.'
                    },
                    {
                        id: 26,
                        title: 'Flexbox',
                        duration: '01:27:39',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=5259',
                        completed: false,
                        description: 'Using Flexbox for layout.'
                    },
                    {
                        id: 27,
                        title: 'flexDirection',
                        duration: '01:30:56',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=5456',
                        completed: false,
                        description: 'Setting flexDirection in layouts.'
                    },
                    {
                        id: 28,
                        title: 'justifyContent, alignItems and alignSelf',
                        duration: '01:32:48',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=5568',
                        completed: false,
                        description: 'Alignment properties in Flexbox.'
                    },
                    {
                        id: 29,
                        title: 'flexWrap and alignContent',
                        duration: '01:37:22',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=5842',
                        completed: false,
                        description: 'Wrapping and content alignment.'
                    },
                    {
                        id: 30,
                        title: 'flexBasis, flexGrow and flexShrink',
                        duration: '01:40:22',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=6022',
                        completed: false,
                        description: 'Flex sizing properties.'
                    },
                    {
                        id: 31,
                        title: 'Absolute and Relative Positioning',
                        duration: '01:43:07',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=6187',
                        completed: false,
                        description: 'Positioning elements absolutely or relatively.'
                    },
                    {
                        id: 32,
                        title: 'Exercises',
                        duration: '01:45:59',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=6359',
                        completed: false,
                        description: 'Hands-on practice exercises.'
                    },
                    {
                        id: 33,
                        title: 'Welcome Screen',
                        duration: '01:46:58',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=6418',
                        completed: false,
                        description: 'Building a welcome screen.'
                    },
                    {
                        id: 34,
                        title: 'View Image Screen',
                        duration: '01:57:55',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=7075',
                        completed: false,
                        description: 'Building a view image screen.'
                    },
                    {
                        id: 35,
                        title: 'Refactoring',
                        duration: '02:02:51',
                        videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc?start=7371',
                        completed: false,
                        description: 'Refactoring the project.'
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: ['You know basic React', 'Want to break into mobile app development.', 'You value fast development and cross-platform compatibility.']
            }
        ],
        exercises: [
            {
                id: 4,
                title: "Flutter Basics",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "8 min",
                points: 15,
                completed: false,
                questions: [
                    {
                        question: "Which programming language is primarily used in Flutter?",
                        options: ["Java", "Kotlin", "Dart", "Swift"],
                        correctAnswer: "Dart"
                    },
                    {
                        question: "What is a widget in Flutter?",
                        options: [
                            "A database tool",
                            "A building block of the UI",
                            "A server configuration",
                            "A type of animation"
                        ],
                        correctAnswer: "A building block of the UI"
                    },
                    {
                        question: "Which widget is used to create a scrollable list of items in Flutter?",
                        options: ["Column", "Row", "ListView", "Stack"],
                        correctAnswer: "ListView"
                    },
                    {
                        question: "What command is used to create a new Flutter project?",
                        options: [
                            "flutter init projectName",
                            "flutter new projectName",
                            "flutter create projectName",
                            "flutter start projectName"
                        ],
                        correctAnswer: "flutter create projectName"
                    }
                ]
            },
            {
                id: 5,
                title: "Swift Fundamentals",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "7 min",
                points: 15,
                completed: false,
                questions: [
                    {
                        question: "Which company developed Swift?",
                        options: ["Google", "Apple", "Microsoft", "IBM"],
                        correctAnswer: "Apple"
                    },
                    {
                        question: "Which keyword is used to declare a constant in Swift?",
                        options: ["let", "const", "var", "static"],
                        correctAnswer: "let"
                    },
                    {
                        question: "Which Swift collection type stores unique unordered values?",
                        options: ["Array", "Dictionary", "Set", "Tuple"],
                        correctAnswer: "Set"
                    },
                    {
                        question: "What is Swift primarily used for?",
                        options: [
                            "Android app development",
                            "iOS and macOS app development",
                            "Web development",
                            "Cloud services"
                        ],
                        correctAnswer: "iOS and macOS app development"
                    }
                ]
            },
            {
                id: 6,
                title: "Kotlin Essentials",
                type: "MCQ",
                difficulty: "Intermediate",
                duration: "9 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "Kotlin is officially supported for which platform?",
                        options: ["iOS", "Android", "Web only", "Windows only"],
                        correctAnswer: "Android"
                    },
                    {
                        question: "Which keyword is used to declare a variable in Kotlin?",
                        options: ["let", "val", "def", "var"],
                        correctAnswer: "var"
                    },
                    {
                        question: "What is the difference between 'val' and 'var' in Kotlin?",
                        options: [
                            "'val' is mutable, 'var' is immutable",
                            "'val' is immutable, 'var' is mutable",
                            "Both are immutable",
                            "Both are mutable"
                        ],
                        correctAnswer: "'val' is immutable, 'var' is mutable"
                    },
                    {
                        question: "Which company developed Kotlin?",
                        options: ["Apple", "JetBrains", "Microsoft", "Google"],
                        correctAnswer: "JetBrains"
                    }
                ]
            },
            {
                id: 7,
                title: "Mobile Development Roadmap",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "10 min",
                points: 25,
                completed: false,
                questions: [
                    {
                        question: "Which two main platforms dominate mobile app development?",
                        options: ["iOS and Android", "Windows and Linux", "Web and Desktop", "BlackBerry and Symbian"],
                        correctAnswer: "iOS and Android"
                    },
                    {
                        question: "Which language is commonly used for iOS development?",
                        options: ["Java", "Kotlin", "Swift", "C#"],
                        correctAnswer: "Swift"
                    },
                    {
                        question: "Which language is primarily used for native Android development?",
                        options: ["Kotlin", "Swift", "Objective-C", "Python"],
                        correctAnswer: "Kotlin"
                    },
                    {
                        question: "What is cross-platform development?",
                        options: [
                            "Building apps that run only on Android",
                            "Building apps that run only on iOS",
                            "Building apps that can run on both iOS and Android",
                            "Building apps without any programming language"
                        ],
                        correctAnswer: "Building apps that can run on both iOS and Android"
                    }
                ]
            }
        ],
        sharedNotes: []
    },
    {
        id: 'finance',
        title: 'Finance',
        icon: faChartLine,
        courses: [
            {
                id: 16,
                title: 'Personal Finance Made Easy',
                description: 'Learn how to budget, save, invest, and retire with confidence, Personal finance encompasses the whole universe of managing individual and family finances, taking responsibility for your current and future financia.',
                thumbnail: 'https://www.caindelhiindia.com/blog/wp-content/uploads/2021/08/personal-finance-2.gif',
                instructor: 'David Lee',
                rating: 4.8,
                students: 12300,
                duration: '28 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 10,
                certificate: true,
                whatYouLearn: [
                    'Budgeting and saving',
                    'Debt management',
                    'Investing basics',
                    'Retirement planning',
                    'Financial independence'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Personal Finance for Beginners',
                        duration: '40:15',
                        videoUrl: 'https://www.youtube.com/embed/nu_pCVPKzTk',
                        completed: false,
                        description: 'Start managing your money like a pro.'
                    },
                    {
                        id: 2,
                        title: 'How to Invest with Little Money',
                        duration: '35:20',
                        videoUrl: 'https://www.youtube.com/embed/ZxKM3DCV2kE',
                        completed: false,
                        description: 'Smart investing strategies for beginners.'
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: []
            },
            {
                id: 10,
                title: 'Financial Risk Management Training',
                description: 'In this Financial Risk Management course, we discuss what risk and risk management mean in a corporate setting. Learn the common methods for managing and measuring risk and how to develop a risk management strategy.',
                thumbnail: 'https://media.eup-prod.co.za/af-south-1/thumbnails/products/Web_images_courses_2240_1260_-_2024-06-03T112152.430_9fddd8ea_thumbnail_4096.jpg',
                instructor: ' Simon Sez',
                rating: 4.9,
                students: 38380,
                duration: '2 hours',
                level: 'Advanced',
                price: 'Free',
                modules: 10,
                certificate: true,
                whatYouLearn: [
                    'Budgeting and saving',
                    'Debt management',
                    'Investing basics',
                    'Retirement planning',
                    'Financial independence'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Simon Sez IT Introduction',
                        duration: '00:00:00',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=0',
                        completed: false,
                        description: 'Simon Sez IT Introduction'
                    },
                    {
                        id: 2,
                        title: 'Introduction to the Course',
                        duration: '00:00:19',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=19',
                        completed: false,
                        description: 'Brief overview of course content'
                    },
                    {
                        id: 3,
                        title: 'What is Risk?',
                        duration: '00:05:17',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=317',
                        completed: false,
                        description: 'Defining risk in finance'
                    },
                    {
                        id: 4,
                        title: 'Uncertainty and Randomness',
                        duration: '00:11:30',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=690',
                        completed: false,
                        description: 'Exploring the concepts of uncertainty and randomness'
                    },
                    {
                        id: 5,
                        title: 'Introduction to Probability',
                        duration: '00:19:44',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=1184',
                        completed: false,
                        description: 'Basics of probability theory in risk'
                    },
                    {
                        id: 6,
                        title: 'Statistics and Changing Outcomes',
                        duration: '00:26:05',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=1565',
                        completed: false,
                        description: 'Using statistics to understand shifting outcomes'
                    },
                    {
                        id: 7,
                        title: 'Overconfidence and Luck',
                        duration: '00:31:53',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=1913',
                        completed: false,
                        description: 'How overconfidence and luck affect risk perception'
                    },
                    {
                        id: 8,
                        title: 'Risk Management and Risk Measurement',
                        duration: '00:38:52',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=2332',
                        completed: false,
                        description: 'Approaches to managing and measuring risk'
                    },
                    {
                        id: 9,
                        title: 'Developing Framework for Managing Risk',
                        duration: '00:47:16',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=2836',
                        completed: false,
                        description: 'Creating a structured risk management framework'
                    },
                    {
                        id: 10,
                        title: 'Case Study: Risk Management Framework',
                        duration: '00:56:19',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=3379',
                        completed: false,
                        description: 'Practical case study on applying the framework'
                    },
                    {
                        id: 11,
                        title: 'Risk Governance',
                        duration: '01:04:31',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=3871',
                        completed: false,
                        description: 'Understanding risk governance structures'
                    },
                    {
                        id: 12,
                        title: 'Risk Tolerance',
                        duration: '01:13:01',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=4381',
                        completed: false,
                        description: 'Defining and assessing risk tolerance levels'
                    },
                    {
                        id: 13,
                        title: 'Risk Budgeting',
                        duration: '01:21:36',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=4896',
                        completed: false,
                        description: 'Concept of allocating risk budgets'
                    },
                    {
                        id: 14,
                        title: 'Case Study: Risk Budgeting and Tolerance',
                        duration: '01:28:56',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=5336',
                        completed: false,
                        description: 'Applying budgeting and tolerance in a case study'
                    },
                    {
                        id: 15,
                        title: 'Balancing Act',
                        duration: '01:35:50',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=5750',
                        completed: false,
                        description: 'Balancing different aspects of risk'
                    },
                    {
                        id: 16,
                        title: 'Managing People',
                        duration: '01:44:59',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=6299',
                        completed: false,
                        description: 'Risk management in people-oriented contexts'
                    },
                    {
                        id: 17,
                        title: 'Managing Risk By Assessing Processes',
                        duration: '01:53:21',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=6801',
                        completed: false,
                        description: 'Using process assessment to manage risk'
                    },
                    {
                        id: 18,
                        title: 'Case Study: Managing People and Processes',
                        duration: '02:01:37',
                        videoUrl: 'https://www.youtube.com/embed/R6QKBVwIB78?start=7297',
                        completed: false,
                        description: 'Final case study on people and process risk'
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: []
            }, {
                id: 16,
                title: 'Fundamentals of Finance & Economics for Businesses',
                description: 'In this course on Finance & Economics for Businesses, you will learn the fundamentals of business strategy and the interplay between these three fields.',
                thumbnail: 'https://i.fbcd.co/products/original/b9425668f085f93c4655202b0444bd89b4c0ddff773d905b065775e551903772.jpg',
                instructor: 'freeCodeCamp',
                rating: 4.6,
                students: 1578380,
                duration: '1.5 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 10,
                certificate: true,
                whatYouLearn: [
                    'Budgeting and saving',
                    'Debt management',
                    'Investing basics',
                    'Retirement planning',
                    'Financial independence'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Introduction',
                        duration: '00:00:00',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=0',
                        completed: false,
                        description: 'Course introduction and overview.'
                    },
                    {
                        id: 2,
                        title: 'Key terms and Basics of Money',
                        duration: '00:01:25',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=85',
                        completed: false,
                        description: 'Introduction to money, basic concepts, and key terms.'
                    },
                    {
                        id: 3,
                        title: 'Excel Analysis of Compound Interest Case Study',
                        duration: '00:08:16',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=496',
                        completed: false,
                        description: 'Practical case study of compound interest using Excel.'
                    },
                    {
                        id: 4,
                        title: 'Financial Markets',
                        duration: '00:10:12',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=612',
                        completed: false,
                        description: 'Overview of financial markets and their role.'
                    },
                    {
                        id: 5,
                        title: 'Business Strategy',
                        duration: '00:20:50',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=1250',
                        completed: false,
                        description: 'Understanding business strategies in finance.'
                    },
                    {
                        id: 6,
                        title: 'Financial Statements',
                        duration: '00:28:22',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=1702',
                        completed: false,
                        description: 'Learning about financial statements and interpretation.'
                    },
                    {
                        id: 7,
                        title: 'Capital Budgeting',
                        duration: '00:47:22',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=2842',
                        completed: false,
                        description: 'Introduction to capital budgeting and decision making.'
                    },
                    {
                        id: 8,
                        title: 'Macroeconomics',
                        duration: '00:55:49',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=3349',
                        completed: false,
                        description: 'Basic principles of macroeconomics.'
                    },
                    {
                        id: 9,
                        title: 'ESG',
                        duration: '01:11:38',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=4298',
                        completed: false,
                        description: 'Environmental, Social, and Governance concepts in finance.'
                    },
                    {
                        id: 10,
                        title: 'Portfolio Diversification & Management',
                        duration: '01:23:48',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=5028',
                        completed: false,
                        description: 'Strategies for portfolio diversification and management.'
                    },
                    {
                        id: 11,
                        title: 'Alternative Investment Types',
                        duration: '01:33:38',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=5618',
                        completed: false,
                        description: 'Exploring alternative investments beyond traditional assets.'
                    },
                    {
                        id: 12,
                        title: 'Summary of Course',
                        duration: '01:36:45',
                        videoUrl: 'https://www.youtube.com/embed/EJHPltmAULA?start=5805',
                        completed: false,
                        description: 'Course wrap-up and summary of main concepts.'
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: []
            }, {
                id: 1,
                title: 'Financial Literacy ',
                description: ' Financial literacy is the ability to make wise decisions with your money. The five principles of financial literacy are earning, saving, borrowing, spending and protecting assets. Financial literacy helps you make better financial decisions and improves overall financial well-being.',
                thumbnail: 'https://www.nga.org/wp-content/uploads/2024/11/financial_literacy-1.jpg',
                instructor: 'Tina Huang',
                rating: 4.2,
                students: 18380,
                duration: '1.5 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 10,
                certificate: true,
                whatYouLearn: [
                    'Budgeting and saving',
                    'Debt management',
                    'Investing basics',
                    'Retirement planning',
                    'Financial independence'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Intro',
                        duration: '00:00',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=0',
                        completed: false,
                        description: 'Intro'
                    },
                    {
                        id: 2,
                        title: 'Course Structure',
                        duration: '00:00:40',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=40',
                        completed: false,
                        description: 'Overview of the course structure'
                    },
                    {
                        id: 3,
                        title: 'Budgeting',
                        duration: '00:02:02',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=122',
                        completed: false,
                        description: 'Fundamentals and techniques of budgeting'
                    },
                    {
                        id: 4,
                        title: 'Consumer Credit',
                        duration: '00:08:43',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=523',
                        completed: false,
                        description: 'Understanding consumer credit and its impact'
                    },
                    {
                        id: 5,
                        title: 'Money Personality Quiz',
                        duration: '00:15:23',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=923',
                        completed: false,
                        description: 'Exploring your financial personality through a quiz'
                    },
                    {
                        id: 6,
                        title: 'Financial Goals',
                        duration: '00:18:03',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=1083',
                        completed: false,
                        description: 'Setting and achieving financial goals'
                    },
                    {
                        id: 7,
                        title: 'Loans & Debt',
                        duration: '00:23:16',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=1396',
                        completed: false,
                        description: 'Managing loans and understanding debt'
                    },
                    {
                        id: 8,
                        title: 'Insurance',
                        duration: '00:29:57',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=1797',
                        completed: false,
                        description: 'Basics of insurance and risk coverage'
                    },
                    {
                        id: 9,
                        title: 'Investments & Retirement',
                        duration: '00:33:43',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=2023',
                        completed: false,
                        description: 'Introduction to investing and retirement planning'
                    },
                    {
                        id: 10,
                        title: 'Scams & Frauds',
                        duration: '00:42:51',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=2571',
                        completed: false,
                        description: 'How to recognize and avoid financial scams and frauds'
                    },
                    {
                        id: 11,
                        title: 'Careers, Education, Employment',
                        duration: '00:45:30',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=2730',
                        completed: false,
                        description: 'Exploring career paths, education, and employment in finance'
                    },
                    {
                        id: 12,
                        title: 'Taxes',
                        duration: '00:49:08',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=2948',
                        completed: false,
                        description: 'Understanding taxes and their financial implications'
                    },
                    {
                        id: 13,
                        title: 'Banking',
                        duration: '00:51:31',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=3091',
                        completed: false,
                        description: 'Fundamentals of banking and financial services'
                    },
                    {
                        id: 14,
                        title: 'Car Buying',
                        duration: '00:56:50',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=3410',
                        completed: false,
                        description: 'Guidance on purchasing a car'
                    },
                    {
                        id: 15,
                        title: 'Housing',
                        duration: '00:57:21',
                        videoUrl: 'https://www.youtube.com/embed/ouvbeb2wSGA?start=3441',
                        completed: false,
                        description: 'Financial considerations related to housing'
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: []
            }
        ],
        exercises: [
            {
                id: 8,
                title: "Personal Finance Made Easy",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "8 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "What is the first step in creating a personal budget?",
                        options: ["Tracking expenses", "Investing in stocks", "Opening a credit card", "Buying insurance"],
                        correctAnswer: "Tracking expenses"
                    },
                    {
                        question: "Why is an emergency fund important?",
                        options: [
                            "It helps cover unexpected expenses without debt",
                            "It increases your monthly income",
                            "It replaces the need for insurance",
                            "It guarantees higher investment returns"
                        ],
                        correctAnswer: "It helps cover unexpected expenses without debt"
                    },
                    {
                        question: "Which retirement account is common in the United States?",
                        options: ["401(k)", "PayPal", "Roth IRA", "Both 401(k) and Roth IRA"],
                        correctAnswer: "Both 401(k) and Roth IRA"
                    },
                    {
                        question: "What is the recommended percentage of income to save?",
                        options: ["1–2%", "10–20%", "50%", "70%"],
                        correctAnswer: "10–20%"
                    },
                    {
                        question: "Why is diversifying investments important?",
                        options: [
                            "It reduces risk by spreading money across assets",
                            "It guarantees maximum returns",
                            "It avoids paying taxes",
                            "It simplifies financial management"
                        ],
                        correctAnswer: "It reduces risk by spreading money across assets"
                    }
                ]
            },
            {
                id: 9,
                title: "Financial Risk Management Training",
                type: "MCQ",
                difficulty: "Advanced",
                duration: "10 min",
                points: 25,
                completed: false,
                questions: [
                    {
                        question: "What does financial risk refer to?",
                        options: [
                            "The chance of earning more than expected",
                            "The possibility of losing money due to uncertainty",
                            "A guarantee of profit",
                            "A fixed interest rate"
                        ],
                        correctAnswer: "The possibility of losing money due to uncertainty"
                    },
                    {
                        question: "Which of the following is NOT a common type of financial risk?",
                        options: ["Market risk", "Credit risk", "Liquidity risk", "Cooking risk"],
                        correctAnswer: "Cooking risk"
                    },
                    {
                        question: "What does 'hedging' mean in risk management?",
                        options: [
                            "Speculating on future prices",
                            "Protecting against potential losses using financial instruments",
                            "Ignoring financial risks",
                            "Borrowing more capital"
                        ],
                        correctAnswer: "Protecting against potential losses using financial instruments"
                    },
                    {
                        question: "What does Value at Risk (VaR) measure?",
                        options: [
                            "The maximum expected loss over a given time at a certain confidence level",
                            "The total market profit",
                            "The average investment return",
                            "The amount of taxes owed"
                        ],
                        correctAnswer: "The maximum expected loss over a given time at a certain confidence level"
                    },
                    {
                        question: "Which department in a corporation usually handles risk management?",
                        options: ["IT", "Finance", "Human Resources", "Marketing"],
                        correctAnswer: "Finance"
                    },
                    {
                        question: "What is the first step in creating a risk management strategy?",
                        options: [
                            "Implementing risk controls",
                            "Identifying and assessing risks",
                            "Writing financial reports",
                            "Buying stocks"
                        ],
                        correctAnswer: "Identifying and assessing risks"
                    }
                ]
            },
            {
                id: 10,
                title: "Fundamentals of Finance & Economics for Businesses",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "9 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "What is the main purpose of business finance?",
                        options: [
                            "To create advertisements",
                            "To manage money for business growth and operations",
                            "To design company logos",
                            "To hire employees"
                        ],
                        correctAnswer: "To manage money for business growth and operations"
                    },
                    {
                        question: "Which of the following is considered a factor of production in economics?",
                        options: ["Land", "Labor", "Capital", "All of the above"],
                        correctAnswer: "All of the above"
                    },
                    {
                        question: "What does ROI stand for in finance?",
                        options: [
                            "Return on Investment",
                            "Rate of Income",
                            "Revenue over Interest",
                            "Real Option Index"
                        ],
                        correctAnswer: "Return on Investment"
                    },
                    {
                        question: "In economics, what does 'opportunity cost' mean?",
                        options: [
                            "The cost of losing money in a market crash",
                            "The value of the next best alternative forgone",
                            "The cost of production inputs",
                            "The amount spent on salaries"
                        ],
                        correctAnswer: "The value of the next best alternative forgone"
                    },
                    {
                        question: "What is the difference between microeconomics and macroeconomics?",
                        options: [
                            "Microeconomics studies individual markets, macroeconomics studies the economy as a whole",
                            "Microeconomics is about politics, macroeconomics is about companies",
                            "Microeconomics studies only businesses, macroeconomics studies only governments",
                            "They are the same"
                        ],
                        correctAnswer: "Microeconomics studies individual markets, macroeconomics studies the economy as a whole"
                    }
                ]
            },
            {
                id: 11,
                title: "Financial Literacy",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "7 min",
                points: 15,
                completed: false,
                questions: [
                    {
                        question: "Which of the following is NOT one of the five principles of financial literacy?",
                        options: ["Earning", "Saving", "Borrowing", "Investing in crypto only"],
                        correctAnswer: "Investing in crypto only"
                    },
                    {
                        question: "Why is borrowing responsibly important?",
                        options: [
                            "To build a good credit score",
                            "To avoid excessive debt",
                            "To manage interest payments",
                            "All of the above"
                        ],
                        correctAnswer: "All of the above"
                    },
                    {
                        question: "What does protecting assets typically involve?",
                        options: ["Buying insurance", "Spending all income", "Selling investments", "Avoiding taxes"],
                        correctAnswer: "Buying insurance"
                    },
                    {
                        question: "Which of these is an example of a financial asset?",
                        options: ["A car", "A house", "A stock", "Furniture"],
                        correctAnswer: "A stock"
                    },
                    {
                        question: "What is the purpose of budgeting?",
                        options: [
                            "To track and control income and expenses",
                            "To maximize debt",
                            "To reduce savings",
                            "To increase unnecessary spending"
                        ],
                        correctAnswer: "To track and control income and expenses"
                    },
                    {
                        question: "Which age group benefits most from financial literacy?",
                        options: [
                            "Teenagers and young adults",
                            "Middle-aged adults",
                            "Retirees",
                            "All age groups"
                        ],
                        correctAnswer: "All age groups"
                    }
                ]
            }
        ],
        sharedNotes: []
    },
    {
        id: 'history',
        title: 'History',
        icon: _jsx(Scroll, { size: 24 }),
        courses: [
            {
                id: 9,
                title: 'How The Middle East Became So Chaotic',
                description: 'Get an idea of the history of the Middle East as a wider region rather than the rather fragmented image thats often portrayed in the media.',
                thumbnail: 'https://i.pinimg.com/736x/75/0a/ea/750aea23a7aaa8669b9993473bf0dd20.jpg',
                instructor: 'REDLINE',
                rating: 4.9,
                students: 421,
                duration: '1 hours',
                level: 'Advanced',
                price: 'Free',
                modules: 9,
                certificate: true,
                overview: 'Middle East Conflicts',
                whatYouLearn: [
                    'Middle East Wars',
                    'Non-biased narration',
                    'Knowledge of history in Middle East'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Intro',
                        duration: '0:00',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=0',
                        completed: false,
                        description: ''
                    },
                    {
                        id: 2,
                        title: 'Palestine & Israel',
                        duration: '1:22',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=82',
                        completed: false,
                        description: ''
                    },
                    {
                        id: 3,
                        title: 'Egypt',
                        duration: '13:15',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=795',
                        completed: false,
                        description: ''
                    },
                    {
                        id: 4,
                        title: 'Syria',
                        duration: '23:46',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=1426',
                        completed: false,
                        description: ''
                    },
                    {
                        id: 5,
                        title: 'Lebanon',
                        duration: '34:51',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=2091',
                        completed: false,
                        description: ''
                    },
                    {
                        id: 6,
                        title: 'Iraq',
                        duration: '48:42',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=2922',
                        completed: false,
                        description: ''
                    },
                    {
                        id: 7,
                        title: 'Jordan',
                        duration: '1:06:14',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=3974',
                        completed: false,
                        description: ''
                    },
                    {
                        id: 8,
                        title: 'Saudi Arabia',
                        duration: '1:21:48',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=4908',
                        completed: false,
                        description: ''
                    },
                    {
                        id: 9,
                        title: 'Iran',
                        duration: '1:27:43',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=5263',
                        completed: false,
                        description: ''
                    },
                    {
                        id: 10,
                        title: 'Turkey',
                        duration: '1:34:27',
                        videoUrl: 'https://youtu.be/ty3QbOBj7zI?t=5667',
                        completed: false,
                        description: ''
                    }
                ],
                reviews: [],
                progress: 0,
                requirements: []
            },
            {
                id: 9,
                title: 'History of Lebanon: Civilizations and Conflicts',
                description: 'From Phoenicians to modern civil war, explore Lebanon\'s diverse history and cultural legacy.',
                thumbnail: 'https://i.pinimg.com/1200x/f0/b3/f2/f0b3f2a4684afe1bb4fa0244390642d2.jpg',
                instructor: 'Dr. Samir Fakhouri',
                rating: 4.7,
                students: 4321,
                duration: '22 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 9,
                certificate: true,
                overview: 'Trace Lebanon\'s journey from the Phoenician seafarers to a modern nation shaped by war and resilience.',
                whatYouLearn: [
                    'Phoenician maritime empire',
                    'Roman and Byzantine heritage',
                    'Ottoman and French rule',
                    'Lebanese Civil War (1975-1990)',
                    'Religious diversity and politics',
                    'Cultural contributions to the world'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'History of Lebanon - Documentary',
                        duration: '44:10',
                        videoUrl: 'https://www.youtube.com/embed/XwqpZ7HjzG0',
                        completed: false,
                        description: 'How Lebanon was created as a nation and its role in the Middle East.'
                    },
                    {
                        id: 2,
                        title: 'Lebanon Explained: Geography and History',
                        duration: '38:20',
                        videoUrl: 'https://www.youtube.com/embed/QsAX8jOxNXs',
                        completed: false,
                        description: 'Understanding Lebanon\'s unique position and diverse population.'
                    },
                    {
                        id: 3,
                        title: 'The Creation of Modern Lebanon',
                        duration: '35:45',
                        videoUrl: 'https://www.youtube.com/embed/asYBpskdKSY',
                        completed: false,
                        description: 'How Lebanon emerged from the Ottoman Empire collapse.'
                    },
                    {
                        id: 4,
                        title: 'Lebanon: A Country Divided',
                        duration: '32:10',
                        videoUrl: 'https://www.youtube.com/embed/x2dFrcpDvhI',
                        completed: false,
                        description: 'Understanding Lebanon\'s complex sectarian system.'
                    },
                    {
                        id: 5,
                        title: 'Phoenicians: Masters of the Mediterranean',
                        duration: '30:40',
                        videoUrl: 'https://www.youtube.com/embed/WlVh7Aw9Gq8',
                        completed: false,
                        description: 'How the Phoenicians shaped Lebanon\'s maritime identity.'
                    },
                    {
                        id: 6,
                        title: 'Lebanese Civil War Explained',
                        duration: '28:15',
                        videoUrl: 'https://www.youtube.com/embed/TigyWfjEKw8',
                        completed: false,
                        description: 'Causes and consequences of the 15-year civil war.'
                    },
                    {
                        id: 7,
                        title: 'Lebanon in the 20th Century',
                        duration: '40:20',
                        videoUrl: 'https://www.youtube.com/embed/aBswCrpLSao',
                        completed: false,
                        description: 'From French mandate to independence and beyond.'
                    },
                    {
                        id: 8,
                        title: 'Modern Lebanon: Crisis and Resilience',
                        duration: '33:15',
                        videoUrl: 'https://www.youtube.com/embed/HqiJ58NN1cc',
                        completed: false,
                        description: 'Lebanon\'s contemporary challenges and cultural strength.'
                    },
                    {
                        id: 9,
                        title: 'Lebanon: Cultural Crossroads',
                        duration: '25:30',
                        videoUrl: 'https://www.youtube.com/embed/CMeXpWAp0b4',
                        completed: false,
                        description: 'How Lebanon became the cultural hub of the Arab world.'
                    },
                    {
                        id: 10,
                        title: 'The Future of Lebanon',
                        duration: '22:30',
                        videoUrl: 'https://www.youtube.com/embed/GMdHd4X8clQ',
                        completed: false,
                        description: 'Prospects for Lebanon\'s political and economic recovery.'
                    }
                ],
                reviews: [],
                progress: 0,
                requirements: []
            },
            {
                id: 7,
                title: 'History of Palestine: From Ancient Times to Present',
                description: 'A comprehensive journey through the history of Palestine, its civilizations, and modern political developments.',
                thumbnail: 'https://i.pinimg.com/736x/27/cd/58/27cd5886d737e8d1e5f55d52a0a7135e.jpg',
                instructor: 'Dr. Leila Hassan',
                rating: 4.8,
                students: 9834,
                duration: '26 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 11,
                certificate: true,
                overview: 'Explore the rich and complex history of Palestine, from Canaanite roots to Ottoman rule and modern statehood struggles.',
                requirements: [
                    'Interest in Middle Eastern history',
                    'Basic historical knowledge',
                    'Open mind to diverse perspectives'
                ],
                whatYouLearn: [
                    'Ancient civilizations of Palestine',
                    'Ottoman and British rule periods',
                    '1948 Nakba and its impact',
                    'Modern political movements',
                    'Cultural heritage and resistance',
                    'International diplomacy and peace efforts'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'The Israel-Palestine Conflict Explained',
                        duration: '15:30',
                        videoUrl: 'https://www.youtube.com/embed/VMlqA5b-Kyk',
                        completed: false,
                        description: 'A comprehensive overview of the Israel-Palestine conflict.'
                    },
                    {
                        id: 2,
                        title: 'Palestine and Israel Explained',
                        duration: '18:45',
                        videoUrl: 'https://www.youtube.com/embed/wfGA6-aehDI',
                        completed: false,
                        description: 'Detailed explanation of the historical context and current situation.'
                    },
                    {
                        id: 3,
                        title: 'History of Palestine - Documentary',
                        duration: '45:20',
                        videoUrl: 'https://www.youtube.com/embed/uxFvGOLklJo',
                        completed: false,
                        description: 'Full documentary covering Palestine\'s complete historical timeline.'
                    },
                    {
                        id: 4,
                        title: 'The History of Palestine',
                        duration: '32:10',
                        videoUrl: 'https://www.youtube.com/embed/lPcrgdTFUDA',
                        completed: false,
                        description: 'In-depth analysis of Palestinian history and culture.'
                    },
                    {
                        id: 5,
                        title: 'Palestine: A Four Thousand Year History',
                        duration: '28:30',
                        videoUrl: 'https://www.youtube.com/embed/NPibuuyHA8g',
                        completed: false,
                        description: 'Comprehensive look at 4000 years of Palestinian history.'
                    },
                    {
                        id: 6,
                        title: 'The Palestinian Story',
                        duration: '22:15',
                        videoUrl: 'https://www.youtube.com/embed/YR2_lwHbwPw',
                        completed: false,
                        description: 'Personal stories and historical accounts from Palestinians.'
                    },
                    {
                        id: 7,
                        title: 'Palestine Before Israel',
                        duration: '35:40',
                        videoUrl: 'https://www.youtube.com/embed/2cO2-5QhTUE',
                        completed: false,
                        description: 'What Palestine looked like before the creation of Israel.'
                    },
                    {
                        id: 8,
                        title: 'The Nakba: Palestine\'s Catastrophe',
                        duration: '26:20',
                        videoUrl: 'https://www.youtube.com/embed/8N4HjYqZ9F4',
                        completed: false,
                        description: 'Understanding the 1948 Nakba and its lasting impact.'
                    },
                    {
                        id: 9,
                        title: 'Palestinian Refugees: The Right of Return',
                        duration: '31:10',
                        videoUrl: 'https://www.youtube.com/embed/F_9S9aJk-1w',
                        completed: false,
                        description: 'The story of Palestinian displacement and the right of return.'
                    },
                    {
                        id: 10,
                        title: 'Modern Palestine: Challenges and Hope',
                        duration: '24:45',
                        videoUrl: 'https://www.youtube.com/embed/bFZpiO4p4Fw',
                        completed: false,
                        description: 'Contemporary Palestinian society and future prospects.'
                    }
                ],
                reviews: [
                    {
                        student: "Youssef Ali",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                        rating: 5,
                        comment: "Finally, a course that tells the full story with respect and accuracy.",
                        date: "2024-12-08"
                    }
                ],
                progress: 30
            },
            {
                id: 8,
                title: 'Egyptology: Secrets of Ancient Egypt',
                description: 'Uncover the mysteries of Pharaohs, pyramids, and hieroglyphs in this deep dive into Ancient Egypt.',
                thumbnail: 'https://i.pinimg.com/736x/69/0a/28/690a282c484ae90968df9e99c1bb2955.jpg',
                instructor: 'Prof. James Carter',
                rating: 4.9,
                students: 12400,
                duration: '30 hours',
                level: 'Beginner to Advanced',
                price: 'Free',
                modules: 14,
                certificate: true,
                overview: 'From the Pyramids of Giza to the Valley of the Kings, explore the wonders of one of history\'s greatest civilizations.',
                requirements: [
                    'No prior knowledge needed',
                    'Curiosity about ancient cultures'
                ],
                whatYouLearn: [
                    'Pharaonic dynasties and rulers',
                    'Hieroglyphic writing system',
                    'Religion and afterlife beliefs',
                    'Construction of the pyramids',
                    'Tutankhamun and famous tombs',
                    'Modern archaeology in Egypt'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'The ENTIRE History of Egypt',
                        duration: '45:30',
                        videoUrl: 'https://www.youtube.com/embed/CskfvgEItPA',
                        completed: false,
                        description: 'A full documentary covering Egypt from pre-dynastic to Roman times.'
                    },
                    {
                        id: 2,
                        title: 'Ancient Egypt - Crash Course World History',
                        duration: '12:15',
                        videoUrl: 'https://www.youtube.com/embed/ZU2Roq-emxw',
                        completed: false,
                        description: 'Fast-paced overview of Ancient Egypt by Crash Course.'
                    },
                    {
                        id: 3,
                        title: 'Mysteries of Ancient Egypt',
                        duration: '42:10',
                        videoUrl: 'https://www.youtube.com/embed/8AgeNvHZ_ks',
                        completed: false,
                        description: 'Hidden chambers, mummies, and lost cities of Ancient Egypt.'
                    },
                    {
                        id: 4,
                        title: 'Ancient Egyptian Civilization Documentary',
                        duration: '38:45',
                        videoUrl: 'https://www.youtube.com/embed/TeDYNXPjw6c',
                        completed: false,
                        description: 'In-depth look at the rise and fall of Egyptian civilization.'
                    },
                    {
                        id: 5,
                        title: 'Secrets of Ancient Egypt',
                        duration: '40:20',
                        videoUrl: 'https://www.youtube.com/embed/BoBapnk6TB8',
                        completed: false,
                        description: 'Archaeological discoveries revealing Egypt\'s secrets.'
                    },
                    {
                        id: 6,
                        title: 'Ancient Egyptian History',
                        duration: '28:30',
                        videoUrl: 'https://www.youtube.com/embed/_95uuPSDYOI',
                        completed: false,
                        description: 'Comprehensive overview of Egyptian dynasties and culture.'
                    },
                    {
                        id: 7,
                        title: 'Egypt: Engineering an Empire',
                        duration: '50:15',
                        videoUrl: 'https://www.youtube.com/embed/lmq7ZcBvqyM',
                        completed: false,
                        description: 'How ancient Egyptians built their magnificent monuments.'
                    },
                    {
                        id: 8,
                        title: 'Life in Ancient Egypt',
                        duration: '26:40',
                        videoUrl: 'https://www.youtube.com/embed/_YT_CYR6vGs',
                        completed: false,
                        description: 'Daily life, customs, and society in ancient Egypt.'
                    },
                    {
                        id: 9,
                        title: 'The Great Pyramid Mystery',
                        duration: '52:30',
                        videoUrl: 'https://www.youtube.com/embed/Qd5w9x7n1XQ',
                        completed: false,
                        description: 'Scientific exploration of pyramid construction techniques.'
                    },
                    {
                        id: 10,
                        title: 'Egyptian Pharaohs and Their Legacy',
                        duration: '48:15',
                        videoUrl: 'https://www.youtube.com/embed/1J1tu7dJ0eA',
                        completed: false,
                        description: 'The great pharaohs who shaped ancient Egypt.'
                    }
                ],
                reviews: [],
                progress: 0
            },
            {
                id: 9,
                title: 'History of Palestine and isreal Genocide',
                description: 'The 1948 Palestine war saw the forcible displacement of a majority of the Arab population, and consequently the establishment of Israel; these events are referred to by Palestinians as the Nakba.',
                thumbnail: 'https://indiatomorrow.net/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-12-at-17.20.18.jpeg',
                instructor: 'Ahmed El Ghandour',
                rating: 4.7,
                students: 714321,
                duration: '1 hours',
                level: 'Advanced',
                price: 'Free',
                modules: 9,
                certificate: true,
                overview: 'Trace Palestine\'s journey from the Phoenician seafarers to a modern nation shaped by war and resilience.',
                whatYouLearn: [
                    'Palestine Civil War (1948-2025)',
                    'Religious diversity and politics',
                    'Cultural contributions to the world'
                ],
                lessons: [
                    {
                        id: 1,
                        title: "الطنطورة",
                        duration: "12:58",
                        videoUrl: "https://www.youtube.com/embed/f0oy-NicIgE?start=0",
                        completed: false,
                        description: "مجزرة الطنطورة وأحداثها."
                    },
                    {
                        id: 2,
                        title: "أسطورة أضطهاد 2000 سنة",
                        duration: "03:14",
                        videoUrl: "https://www.youtube.com/embed/f0oy-NicIgE?start=779",
                        completed: false,
                        description: "تفنيد أسطورة اضطهاد اليهود لمدة 2000 سنة."
                    },
                    {
                        id: 3,
                        title: "أسطورة الصهيونية هي اليهودية",
                        duration: "06:29",
                        videoUrl: "https://www.youtube.com/embed/f0oy-NicIgE?start=974",
                        completed: false,
                        description: "الفرق بين الصهيونية واليهودية."
                    },
                    {
                        id: 4,
                        title: "أسطورة أرض بلا شعب",
                        duration: "04:06",
                        videoUrl: "https://www.youtube.com/embed/f0oy-NicIgE?start=1364",
                        completed: false,
                        description: "خرافة الأرض بلا شعب لشعب بلا أرض."
                    },
                    {
                        id: 5,
                        title: "أسطورة الإستقلال عن بريطانيا",
                        duration: "18:59",
                        videoUrl: "https://www.youtube.com/embed/f0oy-NicIgE?start=1611",
                        completed: false,
                        description: "مراجعة أسطورة الاستقلال عن بريطانيا."
                    },
                    {
                        id: 6,
                        title: "أسطورة داوود وجالوت",
                        duration: "11:00",
                        videoUrl: "https://www.youtube.com/embed/f0oy-NicIgE?start=2751",
                        completed: false,
                        description: "تحليل أسطورة داوود وجالوت."
                    },
                    {
                        id: 7,
                        title: "أسطورة الديموقراطية الوحيدة في الشرق الأوسط",
                        duration: "05:10",
                        videoUrl: "https://www.youtube.com/embed/f0oy-NicIgE?start=3411",
                        completed: false,
                        description: "نقد أسطورة الديمقراطية الوحيدة في المنطقة."
                    }
                ],
                reviews: [],
                progress: 0,
                requirements: []
            },
            {
                id: 9,
                title: 'Surviving Hell | Her Return to Khiam Prison',
                description: 'a fellow prisoner of Khiam who was detained at the same time as Souha. Their testimonies, courage, and memory shape a haunting and intimate portrait of life, survival, and most notorious detention centers.',
                thumbnail: 'https://i.pinimg.com/1200x/83/f7/bb/83f7bbd58cd5c991245b2bab56b93468.jpg',
                instructor: 'REDLINE',
                rating: 4.9,
                students: 421,
                duration: '1 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 9,
                certificate: true,
                overview: 'Surviving Hell is a powerful documentary directed by Randa Chahal Sabag.',
                whatYouLearn: [
                    'Khiam prison',
                    '8 years Israeli occupation of Southern Lebanon',
                    'Symbol of Lebanese resistance'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'Return to Khiam Prison',
                        duration: '57:10',
                        videoUrl: 'https://youtu.be/ETyxz-GVsnE',
                        completed: false,
                        description: 'How Lebanon was created as a nation and its role in the Middle East.'
                    }
                ],
                reviews: [],
                progress: 0,
                requirements: []
            }
        ],
        exercises: [
            {
                id: 12,
                title: "How The Middle East Became So Chaotic",
                type: "MCQ",
                difficulty: "Advanced",
                duration: "8 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "Which factor has significantly contributed to the instability of the Middle East in modern history?",
                        options: [
                            "Abundant freshwater resources",
                            "Colonial borders drawn after World War I",
                            "Homogeneous ethnic composition",
                            "Isolation from global politics"
                        ],
                        correctAnswer: "Colonial borders drawn after World War I"
                    },
                    {
                        question: "What resource has played a central role in Middle Eastern geopolitics?",
                        options: ["Coal", "Oil", "Timber", "Gold"],
                        correctAnswer: "Oil"
                    },
                    {
                        question: "Which global event intensified conflicts in the Middle East in the 20th century?",
                        options: [
                            "The Cold War",
                            "The French Revolution",
                            "The Industrial Revolution",
                            "World War I only"
                        ],
                        correctAnswer: "The Cold War"
                    },
                    {
                        question: "Which city is considered holy to Judaism, Christianity, and Islam?",
                        options: ["Mecca", "Cairo", "Jerusalem", "Baghdad"],
                        correctAnswer: "Jerusalem"
                    },
                    {
                        question: "Which external powers have historically influenced Middle Eastern politics?",
                        options: [
                            "Britain and France",
                            "United States and Soviet Union",
                            "Ottoman Empire",
                            "All of the above"
                        ],
                        correctAnswer: "All of the above"
                    }
                ]
            },
            {
                id: 13,
                title: "History of Lebanon: Civilizations and Conflicts",
                type: "MCQ",
                difficulty: "Intermediate",
                duration: "10 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "Which ancient civilization is Lebanon most famously associated with?",
                        options: ["Phoenicians", "Romans", "Egyptians", "Babylonians"],
                        correctAnswer: "Phoenicians"
                    },
                    {
                        question: "What was Lebanon's role in ancient maritime trade?",
                        options: [
                            "Major shipbuilders and traders",
                            "Producers of grain",
                            "Nomadic herders",
                            "None of the above"
                        ],
                        correctAnswer: "Major shipbuilders and traders"
                    },
                    {
                        question: "Which European power ruled Lebanon under a mandate after World War I?",
                        options: ["Britain", "France", "Spain", "Italy"],
                        correctAnswer: "France"
                    },
                    {
                        question: "What years did the Lebanese Civil War take place?",
                        options: ["1950–1965", "1975–1990", "1991–2000", "2005–2010"],
                        correctAnswer: "1975–1990"
                    },
                    {
                        question: "Which city is the capital of Lebanon?",
                        options: ["Tripoli", "Beirut", "Sidon", "Tyre"],
                        correctAnswer: "Beirut"
                    }
                ]
            },
            {
                id: 14,
                title: "History of Palestine: From Ancient Times to Present",
                type: "MCQ",
                difficulty: "Intermediate",
                duration: "12 min",
                points: 25,
                completed: false,
                questions: [
                    {
                        question: "Which ancient peoples are linked to the earliest civilizations in Palestine?",
                        options: ["Canaanites", "Phoenicians", "Persians", "Romans"],
                        correctAnswer: "Canaanites"
                    },
                    {
                        question: "Which empire ruled Palestine during the time of Jesus?",
                        options: ["Greek Empire", "Roman Empire", "Ottoman Empire", "Persian Empire"],
                        correctAnswer: "Roman Empire"
                    },
                    {
                        question: "Which empire controlled Palestine before the British mandate?",
                        options: ["Ottoman Empire", "Byzantine Empire", "Mamluks", "French Empire"],
                        correctAnswer: "Ottoman Empire"
                    },
                    {
                        question: "When did the British Mandate for Palestine begin?",
                        options: ["1917", "1920", "1945", "1967"],
                        correctAnswer: "1920"
                    },
                    {
                        question: "Which war in 1948 resulted in the creation of the State of Israel?",
                        options: [
                            "Six-Day War",
                            "Yom Kippur War",
                            "Arab-Israeli War",
                            "Persian Gulf War"
                        ],
                        correctAnswer: "Arab-Israeli War"
                    }
                ]
            },
            {
                id: 15,
                title: "Egyptology: Secrets of Ancient Egypt",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "9 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "Which river was central to the development of Ancient Egyptian civilization?",
                        options: ["Tigris", "Euphrates", "Nile", "Jordan"],
                        correctAnswer: "Nile"
                    },
                    {
                        question: "Which Pharaoh is associated with the construction of the Great Pyramid of Giza?",
                        options: ["Tutankhamun", "Khufu", "Ramses II", "Akhenaten"],
                        correctAnswer: "Khufu"
                    },
                    {
                        question: "What form of writing did Ancient Egyptians use?",
                        options: ["Cuneiform", "Hieroglyphics", "Alphabetic script", "Runes"],
                        correctAnswer: "Hieroglyphics"
                    },
                    {
                        question: "What was the purpose of mummification in Ancient Egypt?",
                        options: [
                            "Preserving bodies for the afterlife",
                            "Decorating tombs",
                            "Scientific study",
                            "Entertainment"
                        ],
                        correctAnswer: "Preserving bodies for the afterlife"
                    },
                    {
                        question: "What was the role of pyramids in Ancient Egypt?",
                        options: [
                            "Royal tombs",
                            "Military fortresses",
                            "Temples",
                            "Markets"
                        ],
                        correctAnswer: "Royal tombs"
                    },
                    {
                        question: "Which goddess was associated with motherhood and magic?",
                        options: ["Isis", "Hathor", "Sekhmet", "Bastet"],
                        correctAnswer: "Isis"
                    }
                ]
            }
        ],
        sharedNotes: []
    },
    {
        id: 'languages',
        title: 'Languages',
        icon: _jsx(Languages, { size: 24 }),
        courses: [
            {
                id: 10,
                title: 'English for Beginners: Speak with Confidence',
                description: 'Master basic English grammar, vocabulary, and conversation skills in 8 weeks.',
                thumbnail: 'https://englishfornoobs.com/wp-content/uploads/2018/11/English-lessons-for-beginners.png  ',
                instructor: 'Emma Wilson',
                rating: 4.7,
                students: 14500,
                duration: '1 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 8,
                certificate: true,
                whatYouLearn: [
                    'Basic grammar and sentence structure',
                    'Common vocabulary (food, family, travel)',
                    'Pronunciation and listening skills',
                    'Everyday conversations',
                    'Writing simple emails and texts',
                    'Cultural tips for speaking English'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'English lessons',
                        duration: '15:12:15',
                        videoUrl: 'https://www.youtube.com/embed/3Kq1MIfTWCE',
                        completed: false,
                        description: 'Learn how to say hello, introduce yourself, and ask simple questions.'
                    }
                ],
                progress: 0,
                overview: '',
                requirements: []
            },
            {
                id: 11,
                title: 'Learn German: From Zero to A1',
                description: 'Start speaking German with clear lessons on grammar, vocabulary, and pronunciation.',
                thumbnail: 'https://media.istockphoto.com/id/2148354755/vector/german-language-collage.jpg?s=612x612&w=0&k=20&c=Gi04Jq4IrJyK3t9c2d4Aw6RfcM52KlZm5YiDAb4oNmo=',
                instructor: 'FreeCodeCamp',
                rating: 4.3,
                students: 23200,
                duration: '11 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 10,
                certificate: true,
                whatYouLearn: [
                    'German alphabet and pronunciation',
                    'Basic grammar (cases, gender)',
                    'Essential phrases for travel',
                    'Numbers, time, and dates',
                    'Reading simple texts',
                    'Understanding native speakers'
                ],
                lessons: [
                    { id: 1, title: 'Course Introduction and Overview', duration: '0:00:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=0', completed: false, description: '' },
                    { id: 2, title: 'German Greetings and Farewells', duration: '0:03:05', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=185', completed: false, description: '' },
                    { id: 3, title: 'The Verb "Sein" (To Be)', duration: '0:12:42', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=762', completed: false, description: '' },
                    { id: 4, title: 'German Alphabet and Spelling', duration: '0:20:07', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=1207', completed: false, description: '' },
                    { id: 5, title: 'Expressing Feelings', duration: '0:34:57', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=2097', completed: false, description: '' },
                    { id: 6, title: 'Essential Phrases: Yes, No, Please, Thank You', duration: '0:44:30', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=2670', completed: false, description: '' },
                    { id: 7, title: 'German Numbers 0-20', duration: '0:53:15', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=3195', completed: false, description: '' },
                    { id: 8, title: 'German Numbers 21-100', duration: '1:04:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=3880', completed: false, description: '' },
                    { id: 9, title: 'Days of the Week and Dates', duration: '1:18:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=4680', completed: false, description: '' },
                    { id: 10, title: 'Months and Seasons', duration: '1:32:20', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=5540', completed: false, description: '' },
                    { id: 11, title: 'Pronunciation: Vowel Sounds', duration: '1:43:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=6180', completed: false, description: '' },
                    { id: 12, title: 'Noun Gender and Articles', duration: '1:50:52', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=6652', completed: false, description: '' },
                    { id: 13, title: 'Stating Your Name', duration: '2:01:28', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=7288', completed: false, description: '' },
                    { id: 14, title: 'The Verb "Wohnen" (To Live)', duration: '2:10:17', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=7817', completed: false, description: '' },
                    { id: 15, title: 'Stating Your Age', duration: '2:15:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=8140', completed: false, description: '' },
                    { id: 16, title: 'Personal Information: Gender & Marital Status', duration: '2:26:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=8760', completed: false, description: '' },
                    { id: 17, title: 'Telephone Numbers', duration: '2:37:37', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=9457', completed: false, description: '' },
                    { id: 18, title: 'German Question Words (W-Questions)', duration: '2:48:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=10120', completed: false, description: '' },
                    { id: 19, title: 'Describing Where You Live', duration: '2:54:51', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=10791', completed: false, description: '' },
                    { id: 20, title: 'Countries & Nationalities', duration: '3:10:25', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=11425', completed: false, description: '' },
                    { id: 21, title: 'Speaking Languages', duration: '3:26:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=12360', completed: false, description: '' },
                    { id: 22, title: 'Pronunciation of "S" Sounds', duration: '3:48:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=13680', completed: false, description: '' },
                    { id: 23, title: 'Larger Numbers (Hundreds, Thousands, Millions)', duration: '3:53:30', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=14010', completed: false, description: '' },
                    { id: 24, title: 'Stating Your Birthdate and Birthplace', duration: '4:03:30', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=14550', completed: false, description: '' },
                    { id: 25, title: 'Family Members Vocabulary', duration: '4:28:32', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=16112', completed: false, description: '' },
                    { id: 26, title: 'Describing Your Family Size and Members', duration: '4:38:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=16680', completed: false, description: '' },
                    { id: 27, title: 'Pronunciation of Vowel Sounds (AU, U, I, O)', duration: '4:50:56', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=17456', completed: false, description: '' },
                    { id: 28, title: 'Possessive Pronouns: My, Your, His, Her', duration: '4:55:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=17740', completed: false, description: '' },
                    { id: 29, title: "Asking and Stating Family Member's Name and Age", duration: '5:01:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=180100', completed: false, description: '' },
                    { id: 30, title: 'Birthdays: Asking & Stating', duration: '5:12:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=18760', completed: false, description: '' },
                    { id: 31, title: 'The Verb "Haben" (To Have)', duration: '5:23:59', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=19439', completed: false, description: '' },
                    { id: 32, title: 'Animal Vocabulary', duration: '5:31:20', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=19880', completed: false, description: '' },
                    { id: 33, title: 'Making Nouns Plural', duration: '5:40:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=20400', completed: false, description: '' },
                    { id: 34, title: 'Talking About Pets', duration: '5:46:42', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=20802', completed: false, description: '' },
                    { id: 35, title: 'Nominative, Accusative, and Dative Cases (Introduction)', duration: '5:57:18', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=21438', completed: false, description: '' },
                    { id: 36, title: 'Adjectives for People (Appearance, Age, Character)', duration: '6:03:59', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=21839', completed: false, description: '' },
                    { id: 37, title: 'Colors', duration: '6:27:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=23220', completed: false, description: '' },
                    { id: 38, title: 'Describing Hair and Eye Color', duration: '6:38:52', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=23932', completed: false, description: '' },
                    { id: 39, title: 'House Rooms Vocabulary', duration: '7:13:16', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=25996', completed: false, description: '' },
                    { id: 40, title: 'Describing Your Home (Size and Rooms)', duration: '7:22:16', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=26536', completed: false, description: '' },
                    { id: 41, title: 'Favorite Room and Why', duration: '7:48:04', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=28084', completed: false, description: '' },
                    { id: 42, title: 'Pronunciation of Initial Consonants', duration: '8:04:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=29040', completed: false, description: '' },
                    { id: 43, title: 'Living Room and Dining Room Items', duration: '8:08:29', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=29309', completed: false, description: '' },
                    { id: 44, title: 'Bedroom and Bathroom Items', duration: '8:19:20', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=29960', completed: false, description: '' },
                    { id: 45, title: 'Kitchen Items', duration: '8:30:31', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=30631', completed: false, description: '' },
                    { id: 46, title: 'Dative Case with Prepositions', duration: '8:39:20', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=31160', completed: false, description: '' },
                    { id: 47, title: 'Telling Time (On the Hour)', duration: '9:13:55', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=33235', completed: false, description: '' },
                    { id: 48, title: 'Telling Time (Past the Hour)', duration: '9:23:20', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=33800', completed: false, description: '' },
                    { id: 49, title: 'Telling Time (To the Hour)', duration: '9:31:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=34240', completed: false, description: '' },
                    { id: 50, title: 'Pronunciation of Final Consonants', duration: '9:39:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=34740', completed: false, description: '' },
                    { id: 51, title: 'Morning Routine (Getting Up, Showering, Brushing Teeth)', duration: '10:07:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=36420', completed: false, description: '' },
                    { id: 52, title: 'Morning Routine (Waking Up, Washing, Having Breakfast)', duration: '10:00:58', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=36058', completed: false, description: '' },
                    { id: 53, title: 'Morning Routine (Leaving Home, Going to Work, Working from Home)', duration: '10:00:20', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=36020', completed: false, description: '' },
                    { id: 54, title: 'Lunchtime and Afternoon Routine', duration: '10:04:50', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=36290', completed: false, description: '' },
                    { id: 55, title: 'Evening Routine', duration: '10:14:36', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=36876', completed: false, description: '' },
                    { id: 56, title: 'Word Order with Time Phrases', duration: '10:22:20', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=37340', completed: false, description: '' },
                    { id: 57, title: 'Separable Verbs', duration: '10:25:40', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=37540', completed: false, description: '' },
                    { id: 58, title: 'Job Names (Masculine & Feminine)', duration: '10:45:11', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=38711', completed: false, description: '' },
                    { id: 59, title: 'Where You Work (Places & Companies)', duration: '11:14:36', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=40476', completed: false, description: '' },
                    { id: 60, title: 'Talking About Your Working Day', duration: '11:25:20', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=41120', completed: false, description: '' },
                    { id: 61, title: 'Modal Verb: Dürfen (To Be Allowed To)', duration: '11:38:00', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=41880', completed: false, description: '' },
                    { id: 62, title: 'Modal Verb: Können (To Be Able To/Can)', duration: '11:45:48', videoUrl: 'https://youtu.be/0p4RCJ8P5ko?t=42348', completed: false, description: '' }
                ],
                progress: 0,
                overview: '',
                requirements: []
            },
            {
                id: 12,
                title: 'French Essentials: Speak Like a Local',
                description: 'Learn French quickly with practical lessons focused on real-life communication.',
                thumbnail: 'https://www.universite-paris-saclay.fr/sites/default/files/2024-04/parlez-vous-francais2_0.jpg',
                instructor: 'FrenchPod101',
                rating: 4.0,
                students: 1238900,
                duration: '1 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 9,
                certificate: true,
                whatYouLearn: [
                    'French pronunciation and accents',
                    'Greeting and small talk',
                    'Ordering food and shopping',
                    'Grammar basics (verbs, articles)',
                    'Listening to native speakers',
                    'Cultural etiquette in France'
                ],
                lessons: [
                    { id: 1, title: 'How to Introduce Yourself', duration: '00:00:13', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=13', completed: false, description: '' },
                    { id: 2, title: "How to Say Where You're From", duration: '00:02:44', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=164', completed: false, description: '' },
                    { id: 3, title: 'How to Talk About Your Occupation', duration: '00:06:11', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=371', completed: false, description: '' },
                    { id: 4, title: 'How to Give Your Phone Number', duration: '00:10:53', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=653', completed: false, description: '' },
                    { id: 5, title: 'How to Talk About Your Parents and Siblings', duration: '00:13:48', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=828', completed: false, description: '' },
                    { id: 6, title: 'How to Talk About Your Spouse and Children', duration: '00:18:00', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=1080', completed: false, description: '' },
                    { id: 7, title: 'How to Use Basic Greetings', duration: '00:21:32', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=1292', completed: false, description: '' },
                    { id: 8, title: 'How to Use Parting Phrases and Expressions', duration: '00:23:28', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=1408', completed: false, description: '' },
                    { id: 9, title: 'How to Use Essential Social Expressions', duration: '00:24:55', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=1495', completed: false, description: '' },
                    { id: 10, title: 'How to Ask About Well-Being', duration: '00:26:42', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=1602', completed: false, description: '' },
                    { id: 11, title: 'How to Give an Opinion About the Weather', duration: '00:30:13', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=1813', completed: false, description: '' },
                    { id: 12, title: 'How to Talk About Basic Weather Conditions', duration: '00:32:45', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=1965', completed: false, description: '' },
                    { id: 13, title: 'How to Ask for Clarification', duration: '00:36:10', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=2170', completed: false, description: '' },
                    { id: 14, title: 'How to Ask for a Word', duration: '00:39:35', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=2375', completed: false, description: '' },
                    { id: 15, title: 'How to Ask for Something at a Store', duration: '00:42:46', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=2566', completed: false, description: '' },
                    { id: 16, title: 'How to Ask if a Store Has Something in Stock', duration: '00:45:35', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=2735', completed: false, description: '' },
                    { id: 17, title: 'How to Ask the Price of Something', duration: '00:49:11', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=2951', completed: false, description: '' },
                    { id: 18, title: 'How to Order at a Restaurant', duration: '00:51:41', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=3101', completed: false, description: '' },
                    { id: 19, title: 'How to Order Two or More of Something', duration: '00:55:39', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=3339', completed: false, description: '' },
                    { id: 20, title: 'How to Give Your Email Address', duration: '00:58:06', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=3486', completed: false, description: '' },
                    { id: 21, title: 'How to Talk about Your Nationality', duration: '01:01:18', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=3678', completed: false, description: '' },
                    { id: 22, title: 'How to Talk About Your Hobbies', duration: '01:04:37', videoUrl: 'https://youtu.be/Sk6YQynZ1h8?t=3877', completed: false, description: '' }
                ],
                progress: 0,
                overview: '',
                requirements: []
            },
            {
                id: 12,
                title: 'Speak Spanish with native speakers!',
                description: 'Learn Spanich quickly with practical lessons focused on native communication speakers.',
                thumbnail: 'https://media.istockphoto.com/id/1055903384/vector/espanol.jpg?s=612x612&w=0&k=20&c=C-ECjXQxLQmFj7rczqvqpWlmaPOljpFAVPfJ3Nvxxp8=',
                instructor: 'Spanish Chunk',
                rating: 4.4,
                students: 23900,
                duration: '1 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 9,
                certificate: true,
                whatYouLearn: [
                    'spanish pronunciation and accents',
                    'Greeting and small talk',
                    'Ordering food and shopping',
                    'Grammar basics (verbs, articles)',
                    'Listening to native speakers',
                    'Cultural etiquette in spanish'
                ],
                lessons: [
                    { id: 1, title: 'Introduction to the Course', duration: '00:02:01', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=121', completed: false, description: 'Overview of the course content and objectives.' },
                    { id: 2, title: 'Greetings in Spanish', duration: '00:05:10', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=431', completed: false, description: 'Learn common Spanish greetings and farewells.' },
                    { id: 3, title: 'How to Introduce Yourself', duration: '00:05:57', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=787', completed: false, description: 'Phrases for introducing yourself in Spanish.' },
                    { id: 4, title: 'Thank You and You Are Welcome', duration: '00:06:57', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=1097', completed: false, description: 'Expressing gratitude and politeness in Spanish.' },
                    { id: 5, title: 'How to Say Goodbye', duration: '00:06:23', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=1260', completed: false, description: 'Common ways to say goodbye in Spanish.' },
                    { id: 6, title: 'Spanish Conversation Basics', duration: '00:06:57', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=1583', completed: false, description: 'Fundamental phrases for everyday conversations.' },
                    { id: 7, title: 'Useful Phrases for Beginners', duration: '00:05:36', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=1980', completed: false, description: 'Essential phrases to start speaking Spanish.' },
                    { id: 8, title: 'Review Chapter 1', duration: '00:06:23', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=2280', completed: false, description: 'Recap of the topics covered in Chapter 1.' },
                    { id: 9, title: 'The Vowels', duration: '00:07:39', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=2498', completed: false, description: 'Understanding Spanish vowel sounds.' },
                    { id: 10, title: 'The Spanish Alphabet', duration: '00:11:58', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=3237', completed: false, description: 'Learning the letters and pronunciation.' },
                    { id: 11, title: 'Spanish Pronunciation', duration: '00:09:35', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=4195', completed: false, description: 'Tips for accurate Spanish pronunciation.' },
                    { id: 12, title: 'The Numbers in Spanish', duration: '00:07:20', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=5130', completed: false, description: 'Counting from 1 to 100 in Spanish.' },
                    { id: 13, title: 'Colors in Spanish', duration: '00:08:01', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=5890', completed: false, description: 'Names of colors and their usage.' },
                    { id: 14, title: 'The Days of the Week', duration: '00:05:25', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=6691', completed: false, description: 'Learning the days and their order.' },
                    { id: 15, title: 'The Months', duration: '00:08:12', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=7111', completed: false, description: 'Names of months and their pronunciation.' },
                    { id: 16, title: 'Tell the Time', duration: '00:08:00', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=7921', completed: false, description: 'Asking and telling time in Spanish.' },
                    { id: 17, title: 'Tú or Usted', duration: '00:08:00', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=8721', completed: false, description: 'Understanding formal and informal address.' },
                    { id: 18, title: 'Review Chapter 2', duration: '00:02:45', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=9521', completed: false, description: 'Summary of Chapter 2 topics.' },
                    { id: 19, title: 'The Pronouns', duration: '00:07:19', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=9577', completed: false, description: 'Personal pronouns and their usage.' },
                    { id: 20, title: 'Noun Gender in Spanish', duration: '00:12:36', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=10296', completed: false, description: 'Understanding masculine and feminine nouns.' },
                    { id: 21, title: 'Articles in Spanish', duration: '00:06:03', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=10932', completed: false, description: 'Definite and indefinite articles.' },
                    { id: 22, title: 'Conjugations', duration: '00:09:09', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=11535', completed: false, description: 'Verb conjugation basics.' },
                    { id: 23, title: 'Ser & Estar', duration: '00:06:45', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=12444', completed: false, description: 'Differences between "ser" and "estar".' },
                    { id: 24, title: 'Review Chapter 3', duration: '00:06:45', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=13189', completed: false, description: 'Recap of Chapter 3 content.' },
                    { id: 25, title: 'How to Make Small Talk', duration: '00:09:30', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=13349', completed: false, description: 'Engaging in casual conversations.' },
                    { id: 26, title: 'Speaking About Weather', duration: '00:05:43', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=14279', completed: false, description: 'Discussing weather conditions.' },
                    { id: 27, title: 'Ask (Basic) Questions', duration: '00:07:21', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=14922', completed: false, description: 'Formulating simple questions.' },
                    { id: 28, title: 'Ask for Help', duration: '00:08:38', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=15643', completed: false, description: 'Phrases to request assistance.' },
                    { id: 29, title: 'How to Apologize', duration: '00:04:20', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=16581', completed: false, description: 'Expressing apologies in Spanish.' },
                    { id: 30, title: 'Descriptions (of a Person)', duration: '00:11:19', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=17001', completed: false, description: 'Describing people in Spanish.' },
                    { id: 31, title: 'Speaking About Nationality', duration: '00:07:29', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=18320', completed: false, description: 'Talking about nationalities.' },
                    { id: 32, title: 'Speaking About Family', duration: '00:06:32', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=19049', completed: false, description: 'Discussing family members.' },
                    { id: 33, title: 'Speaking About Hobbies', duration: '00:05:18', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=19681', completed: false, description: 'Talking about personal interests.' },
                    { id: 34, title: 'Speaking About Job', duration: '00:07:36', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=20299', completed: false, description: 'Discussing occupations.' },
                    { id: 35, title: 'Review Chapter 4', duration: '00:08:38', videoUrl: 'https://youtu.be/RbMn2CikYgI?t=21035', completed: false, description: 'Summary of Chapter 4 topics.' }
                ],
                progress: 0,
                overview: '',
                requirements: []
            }
        ],
        exercises: [
            {
                id: 21,
                title: "English for Beginners: Speak with Confidence",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "8 min",
                points: 15,
                completed: false,
                questions: [
                    {
                        question: "Which of the following is the correct sentence?",
                        options: [
                            "She go to school every day.",
                            "She goes to school every day.",
                            "She going to school every day.",
                            "She gone to school every day."
                        ],
                        correctAnswer: "She goes to school every day."
                    },
                    {
                        question: "What is the plural form of 'child'?",
                        options: ["childs", "childes", "children", "childrens"],
                        correctAnswer: "children"
                    },
                    {
                        question: "Which word is a greeting?",
                        options: ["Goodbye", "Hello", "Thanks", "Please"],
                        correctAnswer: "Hello"
                    },
                    {
                        question: "Which sentence is correct?",
                        options: [
                            "I am student.",
                            "I am a student.",
                            "I student.",
                            "I a student."
                        ],
                        correctAnswer: "I am a student."
                    },
                    {
                        question: "Which of these is a question?",
                        options: [
                            "You are a teacher.",
                            "She likes coffee.",
                            "Are you from England?",
                            "He plays football."
                        ],
                        correctAnswer: "Are you from England?"
                    }
                ]
            },
            {
                id: 22,
                title: "Learn German: From Zero to A1",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "10 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "What is the German word for 'thank you'?",
                        options: ["Bitte", "Danke", "Hallo", "Tschüss"],
                        correctAnswer: "Danke"
                    },
                    {
                        question: "Which of these is the German definite article for masculine nouns?",
                        options: ["die", "das", "der", "den"],
                        correctAnswer: "der"
                    },
                    {
                        question: "How do you say 'Good morning' in German?",
                        options: ["Guten Morgen", "Gute Nacht", "Hallo", "Auf Wiedersehen"],
                        correctAnswer: "Guten Morgen"
                    },
                    {
                        question: "Which of these is the correct translation of 'I am a student'?",
                        options: [
                            "Ich bin Student.",
                            "Ich bist Student.",
                            "Ich sind Student.",
                            "Ich seid Student."
                        ],
                        correctAnswer: "Ich bin Student."
                    },
                    {
                        question: "What is the plural of 'Buch' (book) in German?",
                        options: ["Buchs", "Büchern", "Bücher", "Buchen"],
                        correctAnswer: "Bücher"
                    }
                ]
            },
            {
                id: 23,
                title: "French Essentials: Speak Like a Local",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "9 min",
                points: 15,
                completed: false,
                questions: [
                    {
                        question: "How do you say 'thank you' in French?",
                        options: ["Bonjour", "Merci", "Pardon", "Salut"],
                        correctAnswer: "Merci"
                    },
                    {
                        question: "Which of these means 'goodbye' in French?",
                        options: ["Salut", "Bonsoir", "Au revoir", "Merci"],
                        correctAnswer: "Au revoir"
                    },
                    {
                        question: "What is the French word for 'bread'?",
                        options: ["Pain", "Fromage", "Vin", "Lait"],
                        correctAnswer: "Pain"
                    },
                    {
                        question: "How do you say 'I am a student' in French?",
                        options: [
                            "Je suis étudiant.",
                            "Je es étudiant.",
                            "Je êtes étudiant.",
                            "Je sommes étudiant."
                        ],
                        correctAnswer: "Je suis étudiant."
                    },
                    {
                        question: "Which of these is the correct feminine article in French?",
                        options: ["le", "la", "les", "l’"],
                        correctAnswer: "la"
                    }
                ]
            },
            {
                id: 24,
                title: "Speak Spanish with Native Speakers!",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "10 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "How do you say 'hello' in Spanish?",
                        options: ["Hola", "Adiós", "Gracias", "Buenos"],
                        correctAnswer: "Hola"
                    },
                    {
                        question: "What does 'gracias' mean in Spanish?",
                        options: ["Hello", "Goodbye", "Thank you", "Please"],
                        correctAnswer: "Thank you"
                    },
                    {
                        question: "Which of these means 'good night' in Spanish?",
                        options: ["Buenos días", "Buenas noches", "Buenas tardes", "Adiós"],
                        correctAnswer: "Buenas noches"
                    },
                    {
                        question: "How do you say 'I am a student' in Spanish?",
                        options: [
                            "Soy estudiante.",
                            "Estoy estudiante.",
                            "Es estudiante.",
                            "Somos estudiante."
                        ],
                        correctAnswer: "Soy estudiante."
                    },
                    {
                        question: "What is the Spanish word for 'house'?",
                        options: ["Mesa", "Casa", "Perro", "Libro"],
                        correctAnswer: "Casa"
                    },
                    {
                        question: "Which pronoun is used for 'we' in Spanish?",
                        options: ["Ellos", "Vosotros", "Nosotros", "Ustedes"],
                        correctAnswer: "Nosotros"
                    }
                ]
            }
        ],
        sharedNotes: []
    },
    {
        id: 'chemistry',
        title: 'Chemistry',
        icon: _jsx(FlaskConical, { size: 24 }),
        courses: [
            {
                id: 10,
                title: 'Introduction to Chemistry: Basic Concepts',
                description: 'This online chemistry video tutorial provides a basic overview / introduction of common concepts taught in high school regular, honors, and ap chemistry as well as college general chemistry.',
                thumbnail: 'https://i.ytimg.com/vi/QJbou8OMpdg/maxresdefault.jpg',
                instructor: 'The Organic Chemistry Tutor',
                rating: 4.6,
                students: 5211200,
                duration: '3 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 16,
                certificate: true,
                whatYouLearn: [
                    'Elements',
                    'Metric System',
                    ' Unit Conversion',
                    'The periodic table',
                    'Lab safety and experiments'
                ],
                lessons: [
                    {
                        id: 1,
                        title: 'The periodic table',
                        duration: '30:00',
                        videoUrl: 'https://youtu.be/bka20Q9TN6M',
                        completed: false,
                        description: 'overview of periodic table.'
                    },
                    {
                        id: 2,
                        title: 'Elements',
                        duration: '15:30',
                        videoUrl: 'https://youtu.be/bka20Q9TN6M',
                        completed: false,
                        description: 'Elements of chemistry for beginners.'
                    },
                    {
                        id: 3,
                        title: 'Metric System',
                        duration: '1:45:20',
                        videoUrl: 'https://youtu.be/bka20Q9TN6M',
                        completed: false,
                        description: 'Introduction to organic chemistry and its applications.'
                    },
                    {
                        id: 4,
                        title: 'Unit Conversion',
                        duration: '25:20',
                        videoUrl: 'https://youtu.be/bka20Q9TN6M',
                        completed: false,
                        description: 'Introduction to Unit Conversion.'
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: []
            },
            {
                id: 10,
                title: 'Introduction to Organic Chemistry: Basic Concepts',
                description: 'This online chemistry video tutorial provides a basic overview / introduction of common concepts taught in high school regular, honors, and ap chemistry as well as college general chemistry.',
                thumbnail: 'https://eclass.ppu.edu/pluginfile.php/117062/course/overviewfiles/organic%20chemistry.jpg',
                instructor: 'The Organic Chemistry Tutor',
                rating: 4.6,
                students: 311200,
                duration: '1 hours',
                level: 'Beginner',
                price: 'Free',
                modules: 16,
                certificate: true,
                whatYouLearn: [
                    'Introduction to organic chemistry and basic concepts',
                    'Carbon structure and bonding',
                    'Common functional groups and their properties',
                    'Nomenclature of organic compounds',
                    'Isomerism and stereochemistry',
                    'Basic organic reactions (substitution, addition, elimination, rearrangement)'
                ],
                lessons: [
                    {
                        id: 1,
                        title: "Basic Concepts",
                        duration: "04:50",
                        videoUrl: "https://www.youtube.com/embed/zFyR1JNJbwk",
                        completed: false,
                        description: "Introduction to organic chemistry, its importance, and basic terminology."
                    },
                    {
                        id: 2,
                        title: "Structure and Bonding",
                        duration: "16:50",
                        videoUrl: "https://www.youtube.com/embed/zFyR1JNJbwk",
                        completed: false,
                        description: "Understanding carbon's tetravalency, hybridization, and types of bonds."
                    },
                    {
                        id: 3,
                        title: "Functional Groups",
                        duration: "08:50",
                        videoUrl: "https://www.youtube.com/embed/zFyR1JNJbwk",
                        completed: false,
                        description: "Identification and significance of common functional groups like alcohols, aldehydes, ketones, carboxylic acids, and amines."
                    },
                    {
                        id: 4,
                        title: "Nomenclature",
                        duration: "06:50",
                        videoUrl: "https://www.youtube.com/embed/zFyR1JNJbwk",
                        completed: false,
                        description: "Basic rules for naming organic compounds using IUPAC nomenclature."
                    },
                    {
                        id: 5,
                        title: "Isomerism",
                        duration: "09:50",
                        videoUrl: "https://www.youtube.com/embed/zFyR1JNJbwk",
                        completed: false,
                        description: "Concepts of structural and stereoisomerism."
                    },
                    {
                        id: 6,
                        title: "Reactions",
                        duration: "07:50",
                        videoUrl: "https://www.youtube.com/embed/zFyR1JNJbwk",
                        completed: false,
                        description: "Introduction to common organic reactions such as substitution, addition, elimination, and rearrangement."
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: [
                    'Basic high school chemistry knowledge is helpful but not required',
                    'Familiarity with atoms, bonds, and chemical formulas',
                    'Interest in learning organic chemistry concepts',
                    'Notebook or digital tool for taking notes',
                    'Willingness to follow a 53-minute video lesson'
                ]
            },
            {
                id: 10,
                title: 'Physical Chemistry: Full Course',
                description: 'Physical chemistry is the study of macroscopic, and particulate phenomena in chemical systems in terms of the principles, practices, and concepts of physics such as motion, energy, force, time, thermodynamics.',
                thumbnail: 'https://i.ytimg.com/vi/PQechXuFoyI/maxresdefault.jpg',
                instructor: 'Acadamic Lesson',
                rating: 4.3,
                students: 211200,
                duration: '11 hours',
                level: 'Intermediate',
                price: 'Free',
                modules: 16,
                certificate: true,
                whatYouLearn: [
                    'Gases and gas laws (ideal and real gases)',
                    'Thermodynamics: energy, work, heat, enthalpy, Hess’s law',
                    'Entropy, free energy, and phase diagrams',
                    'Solutions, colligative properties, and chemical potential',
                    'Chemical equilibrium and Le Chatelier’s principle',
                    'Acids, bases, buffers, and pH calculations',
                    'Chemical kinetics and reaction rates'
                ],
                lessons: [
                    {
                        id: 1,
                        title: "Course Introduction",
                        duration: "06:22",
                        videoUrl: "https://www.youtube.com/embed/PQechXuFoyI",
                        completed: false,
                        description: "Introduction to the physical chemistry course."
                    },
                    {
                        id: 2,
                        title: "Gases",
                        duration: "50:44",
                        videoUrl: "https://www.youtube.com/embed/PQechXuFoyI",
                        completed: false,
                        description: "Covers gas properties, ideal and real gases, gas laws, and examples."
                    },
                    {
                        id: 3,
                        title: "Thermodynamics",
                        duration: "2:57:27",
                        videoUrl: "https://www.youtube.com/embed/PQechXuFoyI",
                        completed: false,
                        description: "Internal energy, work, heat, first law, enthalpy, heat capacity, Hess’s law, Kirchhoff’s law, adiabatic processes, and heat engines."
                    },
                    {
                        id: 4,
                        title: "Entropy & Free Energy",
                        duration: "1:26:58",
                        videoUrl: "https://www.youtube.com/embed/PQechXuFoyI",
                        completed: false,
                        description: "Microstates, partition function, entropy, residual entropy, spontaneity, Gibbs free energy, and phase diagrams."
                    },
                    {
                        id: 5,
                        title: "Solutions & Phase Equilibria",
                        duration: "1:59:09",
                        videoUrl: "https://www.youtube.com/embed/PQechXuFoyI",
                        completed: false,
                        description: "Clapeyron equation, Clausius-Clapeyron, chemical potential, Raoult’s law, colligative properties, distillation, freezing point depression, and osmosis."
                    },
                    {
                        id: 6,
                        title: "Equilibrium",
                        duration: "41:11",
                        videoUrl: "https://www.youtube.com/embed/PQechXuFoyI",
                        completed: false,
                        description: "Equilibrium constant, Le Chatelier’s principle, temperature and pressure effects."
                    },
                    {
                        id: 7,
                        title: "Ions in Solution & Acids",
                        duration: "1:07:24",
                        videoUrl: "https://www.youtube.com/embed/PQechXuFoyI",
                        completed: false,
                        description: "Debye-Huckel law, salting in/out, acid equilibrium, real acids, pH, and buffers."
                    },
                    {
                        id: 8,
                        title: "Chemical Kinetics",
                        duration: "2:09:48",
                        videoUrl: "https://www.youtube.com/embed/PQechXuFoyI",
                        completed: false,
                        description: "Rate laws, integrated rate laws, half-life, Arrhenius equation, equilibrium approach, consecutive and multi-step reactions."
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: []
            },
            {
                id: 13,
                title: 'Chemistry 101: Atoms, Molecules & Reactions',
                description: 'A clear and engaging introduction to chemistry for high school and college students.',
                thumbnail: 'https://i.ytimg.com/vi/5iTOphGnCtg/maxresdefault.jpg',
                instructor: 'FreeCodeCamp',
                rating: 4.8,
                students: 2311200,
                duration: '35 hours',
                level: 'Beginner to Intermediate',
                price: 'Free',
                modules: 16,
                certificate: true,
                whatYouLearn: [
                    'Atomic structure and the periodic table',
                    'Chemical bonding and molecules',
                    'Balancing chemical equations',
                    'Acids, bases, and pH',
                    'Stoichiometry and reactions',
                    'Lab safety and experiments'
                ],
                lessons: [
                    {
                        id: 1,
                        title: "Intro",
                        duration: "0:00:37",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Introduction to the chemistry course."
                    },
                    {
                        id: 2,
                        title: "Basics",
                        duration: "1:18:49",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Matter, Measurement, Units, Scientific Notation, Conversions."
                    },
                    {
                        id: 3,
                        title: "Atoms & Compounds",
                        duration: "1:06:00",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Atomic Theory, Periodic Table, Naming Ionic, Molecular Compounds & Acids."
                    },
                    {
                        id: 4,
                        title: "Chemical Reactions & Stoichiometry",
                        duration: "1:23:45",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Equations, Moles, Empirical Formulas, Limiting Reactants."
                    },
                    {
                        id: 5,
                        title: "Solutions & Reactions in Aqueous Phase",
                        duration: "1:33:29",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Electrolytes, Double Displacement, Redox, Molarity, Dilutions, Stoichiometry."
                    },
                    {
                        id: 6,
                        title: "Thermochemistry",
                        duration: "1:43:00",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Thermodynamics, Enthalpy, Work, Calorimetry, Hess’s Law."
                    },
                    {
                        id: 7,
                        title: "Quantum & Atomic Structure",
                        duration: "2:09:37",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Light, Photoelectric Effect, Quantum Numbers, Orbitals, Configurations."
                    },
                    {
                        id: 8,
                        title: "Periodic Trends",
                        duration: "1:40:55",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Atomic Radius, Ionization, Electronegativity, Element Properties."
                    },
                    {
                        id: 9,
                        title: "Bonding & Molecular Structure",
                        duration: "3:03:14",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Ionic & Covalent Bonding, Lewis Structures, VSEPR, Hybridization, MO Theory."
                    },
                    {
                        id: 10,
                        title: "Gases",
                        duration: "1:13:41",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Gas Laws, Ideal & Real Gases."
                    },
                    {
                        id: 11,
                        title: "States of Matter",
                        duration: "1:19:10",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Intermolecular Forces, Phase Diagrams, Solids."
                    },
                    {
                        id: 12,
                        title: "Solutions",
                        duration: "00:28:53",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Formation, Concentration Units, Colligative Properties."
                    },
                    {
                        id: 13,
                        title: "Chemical Kinetics",
                        duration: "2:05:25",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Rates, Rate Laws, Mechanisms, Catalysts, Arrhenius, Integrated Rate Laws."
                    },
                    {
                        id: 14,
                        title: "Equilibrium",
                        duration: "00:52:33",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Equilibrium Constants, Le Chatelier, ICE Tables."
                    },
                    {
                        id: 15,
                        title: "Acids & Bases",
                        duration: "5:16:58",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "pH, Strong/Weak Acids & Bases, Buffers, Titrations, Solubility."
                    },
                    {
                        id: 16,
                        title: "Thermodynamics II",
                        duration: "1:23:12",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Entropy, Gibbs Free Energy, Delta G/H/S, Equilibrium Constant."
                    },
                    {
                        id: 17,
                        title: "Electrochemistry",
                        duration: "2:30:40",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Oxidation Numbers, Redox, Galvanic/Electrolytic Cells, Nernst Equation."
                    },
                    {
                        id: 18,
                        title: "Nuclear Chemistry",
                        duration: "1:06:20",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Nuclear Reactions, Decay, Fission, Fusion, Binding Energy."
                    },
                    {
                        id: 19,
                        title: "Coordination Chemistry",
                        duration: "1:10:45",
                        videoUrl: "https://www.youtube.com/embed/6OV3tmt9uhs",
                        completed: false,
                        description: "Naming, Isomers, Crystal Field Theory, Color, Magnetism."
                    }
                ],
                reviews: [],
                progress: 0,
                overview: '',
                requirements: [
                    'Basic high school chemistry knowledge is helpful but not required',
                    'Familiarity with algebra and basic math operations',
                    'Interest in physical chemistry concepts and problem-solving',
                    'Willingness to follow long video lessons (~12 hours total)',
                    'Notebook or digital tool for taking notes and doing calculations'
                ],
            }
        ],
        exercises: [
            {
                id: 31,
                title: "Introduction to Chemistry: Basic Concepts",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "8 min",
                points: 15,
                completed: false,
                questions: [
                    {
                        question: "What is the smallest unit of matter?",
                        options: ["Molecule", "Atom", "Proton", "Electron"],
                        correctAnswer: "Atom"
                    },
                    {
                        question: "Which of the following is NOT a state of matter?",
                        options: ["Solid", "Liquid", "Gas", "Energy"],
                        correctAnswer: "Energy"
                    },
                    {
                        question: "What is the chemical symbol for water?",
                        options: ["O2", "CO2", "H2O", "HO"],
                        correctAnswer: "H2O"
                    },
                    {
                        question: "Which subatomic particle has a positive charge?",
                        options: ["Neutron", "Proton", "Electron", "Photon"],
                        correctAnswer: "Proton"
                    },
                    {
                        question: "What is the pH of a neutral solution at 25°C?",
                        options: ["0", "7", "14", "1"],
                        correctAnswer: "7"
                    }
                ]
            },
            {
                id: 32,
                title: "Introduction to Organic Chemistry: Basic Concepts",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "9 min",
                points: 15,
                completed: false,
                questions: [
                    {
                        question: "What element is the backbone of organic chemistry?",
                        options: ["Hydrogen", "Oxygen", "Carbon", "Nitrogen"],
                        correctAnswer: "Carbon"
                    },
                    {
                        question: "Which of these is the simplest hydrocarbon?",
                        options: ["Methane", "Ethane", "Propane", "Butane"],
                        correctAnswer: "Methane"
                    },
                    {
                        question: "What functional group is present in alcohols?",
                        options: ["-OH", "-COOH", "-NH2", "-CHO"],
                        correctAnswer: "-OH"
                    },
                    {
                        question: "Which of the following is an aromatic compound?",
                        options: ["Methane", "Benzene", "Ethane", "Propane"],
                        correctAnswer: "Benzene"
                    },
                    {
                        question: "Isomerism in organic chemistry refers to:",
                        options: [
                            "Compounds with same formula but different structures",
                            "Compounds with same structure but different elements",
                            "Compounds with identical boiling points",
                            "Compounds with same reactivity"
                        ],
                        correctAnswer: "Compounds with same formula but different structures"
                    }
                ]
            },
            {
                id: 33,
                title: "Physical Chemistry: Full Course",
                type: "MCQ",
                difficulty: "Intermediate",
                duration: "12 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "Which law relates pressure, volume, and temperature of gases?",
                        options: ["Boyle’s Law", "Avogadro’s Law", "Ideal Gas Law", "Dalton’s Law"],
                        correctAnswer: "Ideal Gas Law"
                    },
                    {
                        question: "What is Gibbs free energy used to determine?",
                        options: [
                            "The entropy of a system",
                            "The spontaneity of a reaction",
                            "The speed of a reaction",
                            "The stability of a compound"
                        ],
                        correctAnswer: "The spontaneity of a reaction"
                    },
                    {
                        question: "Which thermodynamic law states that energy cannot be created or destroyed?",
                        options: [
                            "First Law of Thermodynamics",
                            "Second Law of Thermodynamics",
                            "Third Law of Thermodynamics",
                            "Zeroth Law of Thermodynamics"
                        ],
                        correctAnswer: "First Law of Thermodynamics"
                    },
                    {
                        question: "Which function measures the disorder of a system?",
                        options: ["Enthalpy", "Entropy", "Energy", "Capacity"],
                        correctAnswer: "Entropy"
                    },
                    {
                        question: "What is the SI unit of pressure?",
                        options: ["Pascal", "Joule", "Newton", "Watt"],
                        correctAnswer: "Pascal"
                    }
                ]
            },
            {
                id: 34,
                title: "Chemistry 101: Atoms, Molecules & Reactions",
                type: "MCQ",
                difficulty: "Beginner",
                duration: "10 min",
                points: 20,
                completed: false,
                questions: [
                    {
                        question: "Which scientist proposed the atomic theory?",
                        options: ["Einstein", "Dalton", "Bohr", "Rutherford"],
                        correctAnswer: "Dalton"
                    },
                    {
                        question: "Which type of bond involves the sharing of electrons?",
                        options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
                        correctAnswer: "Covalent bond"
                    },
                    {
                        question: "Which of these is a diatomic molecule?",
                        options: ["NaCl", "H2O", "O2", "CH4"],
                        correctAnswer: "O2"
                    },
                    {
                        question: "In a chemical reaction, what are substances formed called?",
                        options: ["Reactants", "Catalysts", "Products", "Ions"],
                        correctAnswer: "Products"
                    },
                    {
                        question: "What type of reaction is: 2H2 + O2 → 2H2O?",
                        options: ["Decomposition", "Single displacement", "Synthesis", "Combustion"],
                        correctAnswer: "Synthesis"
                    },
                    {
                        question: "Which particle is shared or transferred in chemical bonding?",
                        options: ["Protons", "Neutrons", "Electrons", "Nuclei"],
                        correctAnswer: "Electrons"
                    }
                ]
            }
        ],
        sharedNotes: []
    }
];
