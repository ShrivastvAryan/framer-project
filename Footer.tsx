import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import {
    ArrowUpRight,
    Youtube,
    Instagram,
    Linkedin,
    Twitter,
    Users,
    PlayCircle,
    Star,
    Zap,
    Check,
} from "lucide-react"

interface FooterProps {
    brand: string
    description: string
    ctaTitle: string
    ctaSubtitle: string
    newsletterTitle: string
    newsletterDescription: string
    accentColor: string
}

export default function SkillpathFooter({
    brand,
    description,
    ctaTitle,
    ctaSubtitle,
    newsletterTitle,
    newsletterDescription,
    accentColor,
}: FooterProps) {
    const courseLinks = [
        "All Courses",
        "Content Creation",
        "Social Media",
        "Productivity",
        "Business",
        "Marketing",
        "Audio",
        "Video Editing",
    ]

    const categoryLinks = [
        "YouTube",
        "Instagram Growth",
        "Podcasting",
        "Notion",
        "Freelancing",
        "Email Marketing",
        "Client OS",
        "Short-Form Editing",
    ]

    const companyLinks = [
        "About Us",
        "Our Story",
        "Blog",
        "Careers",
        "Affiliates",
        "Partners",
        "Help Center",
        "Contact Us",
    ]

    const stats = [
        {
            icon: Users,
            number: "25K+",
            label: "Students",
        },
        {
            icon: PlayCircle,
            number: "100+",
            label: "Courses",
        },
        {
            icon: Star,
            number: "4.9/5",
            label: "Ratings",
        },
        {
            icon: Zap,
            number: "Practical",
            label: "Actionable Learning",
        },
    ]

    return (
        <footer
            style={{
                width: "100%",
                padding: "70px 24px 24px",
                boxSizing: "border-box",
                background: "#ffffff",
                fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >
            {/* Main Footer */}
            <div
                style={{
                    position: "relative",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    overflow: "hidden",
                    borderRadius: "30px",
                    padding: "60px 50px 25px",
                    background:
                        "radial-gradient(circle at 80% 0%, rgba(93,47,255,.35), transparent 25%), radial-gradient(circle at 100% 20%, rgba(0,119,255,.3), transparent 25%), #08090d",
                    color: "#fff",
                    boxShadow: "0 30px 80px rgba(0,0,0,.15)",
                }}
            >
                {/* Neon Glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "-120px",
                        right: "5%",
                        width: "500px",
                        height: "220px",
                        background:
                            "linear-gradient(90deg, #7214ff, #c51dff, #2f7cff)",
                        filter: "blur(80px)",
                        opacity: 0.55,
                        pointerEvents: "none",
                    }}
                />

                {/* Top Grid */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "grid",
                        gridTemplateColumns: "1.15fr .75fr .75fr .75fr 1.35fr",
                        gap: "40px",
                    }}
                >
                    {/* Brand */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "22px",
                            }}
                        >
                            <div
                                style={{
                                    width: "13px",
                                    height: "13px",
                                    borderRadius: "50%",
                                    background:
                                        "linear-gradient(135deg, #b71cff, #426dff)",
                                    boxShadow: "0 0 20px rgba(150,40,255,.8)",
                                }}
                            />

                            <div
                                style={{
                                    fontSize: "26px",
                                    fontWeight: 800,
                                    letterSpacing: "-1px",
                                }}
                            >
                                {brand}
                            </div>
                        </div>

                        <p
                            style={{
                                margin: 0,
                                maxWidth: "270px",
                                color: "#b5b6bf",
                                fontSize: "15px",
                                lineHeight: 1.8,
                            }}
                        >
                            {description}
                        </p>

                        {/* Socials */}
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "30px",
                            }}
                        >
                            {[Youtube, Instagram, Twitter, Linkedin].map(
                                (Icon, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            width: "42px",
                                            height: "42px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "rgba(255,255,255,.08)",
                                            border: "1px solid rgba(255,255,255,.1)",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Icon size={18} />
                                    </div>
                                )
                            )}
                        </div>

                        {/* CTA Card */}
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                marginTop: "30px",
                                minHeight: "230px",
                                borderRadius: "22px",
                                padding: "28px",
                                boxSizing: "border-box",
                                background:
                                    "linear-gradient(135deg, #c217ff 0%, #6328ff 55%, #245eff 100%)",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 2,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "34px",
                                        fontWeight: 800,
                                        lineHeight: 1,
                                        letterSpacing: "-1.5px",
                                    }}
                                >
                                    {ctaTitle}
                                </div>

                                <div
                                    style={{
                                        marginTop: "14px",
                                        fontSize: "15px",
                                        color: "rgba(255,255,255,.85)",
                                    }}
                                >
                                    {ctaSubtitle}
                                </div>

                                <div
                                    style={{
                                        position: "absolute",
                                        top: "150px",
                                        left: 0,
                                        width: "44px",
                                        height: "44px",
                                        border: "1px solid rgba(255,255,255,.5)",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <ArrowUpRight size={19} />
                                </div>
                            </div>

                            {/* Decorative ring */}
                            <div
                                style={{
                                    position: "absolute",
                                    width: "150px",
                                    height: "150px",
                                    right: "-40px",
                                    bottom: "-55px",
                                    borderRadius: "50%",
                                    border: "25px solid rgba(255,255,255,.2)",
                                    boxShadow: "0 0 40px rgba(255,255,255,.35)",
                                }}
                            />
                        </div>
                    </div>

                    {/* Courses */}
                    <FooterColumn title="COURSES" links={courseLinks} />

                    {/* Categories */}
                    <FooterColumn title="CATEGORIES" links={categoryLinks} />

                    {/* Company */}
                    <FooterColumn title="COMPANY" links={companyLinks} />

                    {/* Newsletter */}
                    <div
                        style={{
                            borderRadius: "22px",
                            padding: "28px",
                            background: "rgba(255,255,255,.035)",
                            border: "1px solid rgba(255,255,255,.12)",
                            backdropFilter: "blur(20px)",
                            alignSelf: "start",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "13px",
                                fontWeight: 800,
                                color: accentColor,
                                letterSpacing: ".5px",
                                marginBottom: "16px",
                            }}
                        >
                            STAY IN THE LOOP
                        </div>

                        <h3
                            style={{
                                margin: 0,
                                fontSize: "30px",
                                lineHeight: 1.05,
                                letterSpacing: "-1.5px",
                            }}
                        >
                            {newsletterTitle}
                        </h3>

                        <p
                            style={{
                                color: "#a9abb5",
                                fontSize: "14px",
                                lineHeight: 1.6,
                                margin: "18px 0",
                            }}
                        >
                            {newsletterDescription}
                        </p>

                        <input
                            placeholder="Enter your email"
                            style={{
                                width: "100%",
                                height: "54px",
                                boxSizing: "border-box",
                                padding: "0 16px",
                                borderRadius: "12px",
                                outline: "none",
                                border: "1px solid rgba(255,255,255,.15)",
                                background: "rgba(0,0,0,.2)",
                                color: "#fff",
                                fontSize: "14px",
                            }}
                        />

                        <button
                            style={{
                                width: "100%",
                                height: "54px",
                                marginTop: "12px",
                                border: 0,
                                borderRadius: "12px",
                                background:
                                    "linear-gradient(90deg, #d018ff, #326eff)",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "15px",
                                cursor: "pointer",
                            }}
                        >
                            Subscribe&nbsp;&nbsp; →
                        </button>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "7px",
                                marginTop: "16px",
                                color: "#8f919b",
                                fontSize: "12px",
                            }}
                        >
                            <Check size={14} color={accentColor} />
                            No spam. Unsubscribe anytime.
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "20px",
                        marginTop: "55px",
                        padding: "28px 0",
                        borderTop: "1px solid rgba(255,255,255,.1)",
                        borderBottom: "1px solid rgba(255,255,255,.1)",
                    }}
                >
                    {stats.map((stat, index) => {
                        const Icon = stat.icon

                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "14px",
                                    paddingLeft: index !== 0 ? "20px" : "0",
                                    borderLeft:
                                        index !== 0
                                            ? "1px solid rgba(255,255,255,.1)"
                                            : "none",
                                }}
                            >
                                <div
                                    style={{
                                        width: "46px",
                                        height: "46px",
                                        flexShrink: 0,
                                        borderRadius: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background:
                                            "linear-gradient(135deg, #7021ff, #276cff)",
                                    }}
                                >
                                    <Icon size={20} />
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontSize: "19px",
                                            fontWeight: 800,
                                        }}
                                    >
                                        {stat.number}
                                    </div>

                                    <div
                                        style={{
                                            color: "#858792",
                                            fontSize: "12px",
                                            marginTop: "3px",
                                        }}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "25px",
                        color: "#777984",
                        fontSize: "12px",
                    }}
                >
                    <div>© 2026 {brand}. All rights reserved.</div>

                    <div
                        style={{
                            display: "flex",
                            gap: "25px",
                        }}
                    >
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Refund Policy</span>
                    </div>
                </div>
            </div>

            {/* Responsive CSS */}
            <style>{`
                @media (max-width: 1000px) {
                    footer > div {
                        padding: 45px 30px 25px !important;
                    }

                    footer > div > div:first-child {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }

                    footer > div > div:nth-child(2) {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }

                @media (max-width: 600px) {
                    footer {
                        padding: 30px 12px !important;
                    }

                    footer > div {
                        border-radius: 22px !important;
                        padding: 35px 20px 20px !important;
                    }

                    footer > div > div:first-child {
                        grid-template-columns: 1fr !important;
                    }

                    footer > div > div:nth-child(2) {
                        grid-template-columns: 1fr 1fr !important;
                    }

                    footer > div > div:last-child {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                }
            `}</style>
        </footer>
    )
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
    return (
        <div>
            <div
                style={{
                    display: "inline-block",
                    paddingBottom: "10px",
                    marginBottom: "20px",
                    color: "#a42cff",
                    fontSize: "13px",
                    fontWeight: 800,
                    borderBottom: "1px solid #7c38ff",
                }}
            >
                {title}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                {links.map((link) => (
                    <span
                        key={link}
                        style={{
                            color: "#d1d2d8",
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "color .2s",
                        }}
                    >
                        {link}
                    </span>
                ))}
            </div>
        </div>
    )
}

SkillpathFooter.defaultProps = {
    brand: "Skillpath",
    description:
        "Practical courses and templates for creators, entrepreneurs, and modern builders.",
    ctaTitle: "Keep Building.",
    ctaSubtitle: "We'll help you grow.",
    newsletterTitle: "Get fresh tips and updates.",
    newsletterDescription:
        "Join 10,000+ builders getting weekly insights and resources.",
    accentColor: "#b72cff",
}

addPropertyControls(SkillpathFooter, {
    brand: {
        type: ControlType.String,
        title: "Brand",
    },

    description: {
        type: ControlType.String,
        title: "Description",
        displayTextArea: true,
    },

    ctaTitle: {
        type: ControlType.String,
        title: "CTA Title",
    },

    ctaSubtitle: {
        type: ControlType.String,
        title: "CTA Subtitle",
    },

    newsletterTitle: {
        type: ControlType.String,
        title: "Newsletter Title",
    },

    newsletterDescription: {
        type: ControlType.String,
        title: "Newsletter Text",
        displayTextArea: true,
    },

    accentColor: {
        type: ControlType.Color,
        title: "Accent",
    },
})
