import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type SkillpathNavbarProps = {
    logoText: string
    accentColor: string
}

export default function SkillpathNavbar({
    logoText,
    accentColor,
}: SkillpathNavbarProps) {
    return (
        <nav className="skillpath-navbar">
            <div className="skillpath-logo">
                <span
                    className="skillpath-logo-dot"
                    style={{ background: accentColor }}
                />
                <span>{logoText}</span>
            </div>

            <div className="skillpath-links">
                <a href="#courses">Courses</a>
                <a href="#categories">Categories</a>
                <a href="#about">About</a>
            </div>

            <button
                className="skillpath-button"
                style={{ background: accentColor }}
            >
                Get Started
            </button>

            <style>{`
                * {
                    box-sizing: border-box;
                }

                .skillpath-navbar {
                    width: 50vw;
                    height: 72px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    padding: 0 28px;

                    /* Liquid glass effect */
                    background: rgba(255, 255, 255, 0.62);
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);

                    border: 1px solid rgba(255, 255, 255, 0.55);
                    border-radius: 18px;

                    box-shadow:
                        0 8px 32px rgba(0, 0, 0, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.7);

                    position: relative;
                    z-index: 10;

                    font-family:
                        Inter,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .skillpath-logo {
                    display: flex;
                    align-items: center;
                    gap: 9px;

                    font-size: 20px;
                    font-weight: 750;
                    letter-spacing: -0.5px;
                    color: #111827;
                }

                .skillpath-logo-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;

                    box-shadow:
                        0 0 0 4px rgba(99, 91, 255, 0.08),
                        0 0 18px rgba(99, 91, 255, 0.35);
                }

                .skillpath-links {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                }

                .skillpath-links a {
                    color: #4B5563;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 500;

                    transition:
                        color 0.2s ease,
                        transform 0.2s ease;
                }

                .skillpath-links a:hover {
                    color: #111827;
                    transform: translateY(-1px);
                }

                .skillpath-button {
                    border: none;
                    color: white;

                    padding: 11px 17px;
                    border-radius: 10px;

                    font-size: 14px;
                    font-weight: 650;

                    cursor: pointer;

                    box-shadow:
                        0 6px 18px rgba(99, 91, 255, 0.22);

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .skillpath-button:hover {
                    transform: translateY(-1px);

                    box-shadow:
                        0 9px 22px rgba(99, 91, 255, 0.3);
                }

                @media (max-width: 700px) {
                    .skillpath-navbar {
                        height: 64px;
                        padding: 0 18px;
                    }

                    .skillpath-links {
                        display: none;
                    }

                    .skillpath-logo {
                        font-size: 18px;
                    }

                    .skillpath-button {
                        padding: 9px 13px;
                        font-size: 13px;
                    }
                }
            `}</style>
        </nav>
    )
}

addPropertyControls(SkillpathNavbar, {
    logoText: {
        type: ControlType.String,
        title: "Logo",
        defaultValue: "Skillpath",
    },

    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: "#635BFF",
    },
})
