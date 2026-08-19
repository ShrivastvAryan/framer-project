import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

type Course = {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse: string
    courseType: string
    pricePaise: number
    priceUsdCents: number
    mangoId: string
    refundable: boolean
}

type CountryResponse = {
    country_code: "IN" | "US"
}

type CoursesGridProps = {
    accentColor: string
    cardRadius: number
}

const COURSES_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/course-data"

const COUNTRY_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

/* ============================================================
   PRICE
   ============================================================ */

function formatPrice(course: Course, countryCode: string): string {
    if (countryCode === "IN") {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(course.pricePaise / 100)
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(course.priceUsdCents / 100)
}

/* ============================================================
   API HELPERS
   ============================================================ */

async function fetchCourses(signal: AbortSignal): Promise<Course[]> {
    const response = await fetch(COURSES_URL, {
        method: "GET",
        signal,
    })

    if (!response.ok) {
        throw new Error(`Course request failed: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
        throw new Error("Invalid course response")
    }

    return data
}

async function fetchCountry(signal: AbortSignal): Promise<CountryResponse> {
    const response = await fetch(COUNTRY_URL, {
        method: "GET",
        signal,
    })

    if (!response.ok) {
        throw new Error(`Country request failed: ${response.status}`)
    }

    const data = await response.json()

    if (data?.country_code !== "IN" && data?.country_code !== "US") {
        throw new Error("Unsupported country")
    }

    return data
}

/* ============================================================
   SKELETON
   ============================================================ */

function CourseSkeleton() {
    return (
        <article className="skillpath-card skillpath-skeleton-card">
            <div className="skeleton skeleton-category" />

            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-title-short" />

            <div className="skeleton skeleton-description" />
            <div className="skeleton skeleton-description" />

            <div className="skeleton-footer">
                <div className="skeleton skeleton-price" />
                <div className="skeleton skeleton-badge" />
            </div>
        </article>
    )
}

function LoadingState() {
    return (
        <div className="skillpath-grid">
            {Array.from({ length: 6 }).map((_, index) => (
                <CourseSkeleton key={index} />
            ))}
        </div>
    )
}

/* ============================================================
   PRICE SKELETON
   ============================================================ */

function PriceSkeleton() {
    return <span className="price-loading" aria-label="Loading price" />
}

/* ============================================================
   ERROR STATE
   ============================================================ */

type ErrorStateProps = {
    message: string
    onRetry: () => void
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="skillpath-state">
            <div className="state-icon state-error-icon">!</div>

            <h3 className="state-title">Couldn't load courses</h3>

            <p className="state-text">{message}</p>

            <button type="button" className="retry-button" onClick={onRetry}>
                Try again
            </button>
        </div>
    )
}

/* ============================================================
   EMPTY STATE
   ============================================================ */

function EmptyState() {
    return (
        <div className="skillpath-state">
            <div className="state-icon state-empty-icon">📚</div>

            <h3 className="state-title">No courses available</h3>

            <p className="state-text">
                There are no courses available right now. Check back soon.
            </p>
        </div>
    )
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function CoursesGrid(props: CoursesGridProps) {
    const { accentColor = "#635BFF", cardRadius = 16 } = props

    const [courses, setCourses] = useState<Course[]>([])
    const [countryCode, setCountryCode] = useState<"IN" | "US" | null>(null)

    const [coursesLoading, setCoursesLoading] = useState(true)
    const [countryLoading, setCountryLoading] = useState(true)

    const [coursesError, setCoursesError] = useState(false)
    const [countryError, setCountryError] = useState(false)

    /* ========================================================
       LOAD COURSES
       ======================================================== */

    const loadCourses = useCallback(async (signal: AbortSignal) => {
        setCoursesLoading(true)
        setCoursesError(false)

        try {
            const data = await fetchCourses(signal)

            setCourses(data)
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return
            }

            console.error("Failed to load courses:", error)

            setCourses([])
            setCoursesError(true)
        } finally {
            if (!signal.aborted) {
                setCoursesLoading(false)
            }
        }
    }, [])

    /* ========================================================
       LOAD COUNTRY
       ======================================================== */

    const loadCountry = useCallback(async (signal: AbortSignal) => {
        setCountryLoading(true)
        setCountryError(false)

        try {
            const data = await fetchCountry(signal)

            setCountryCode(data.country_code)
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return
            }

            console.error("Failed to detect country:", error)

            /*
             * Country detection failing should NOT make the
             * course section unusable.
             *
             * We use USD as a deterministic fallback and
             * clearly tell the user about it.
             */
            setCountryCode("US")
            setCountryError(true)
        } finally {
            if (!signal.aborted) {
                setCountryLoading(false)
            }
        }
    }, [])

    /* ========================================================
       INITIAL FETCH
       ======================================================== */

    useEffect(() => {
        const controller = new AbortController()

        loadCourses(controller.signal)
        loadCountry(controller.signal)

        return () => {
            controller.abort()
        }
    }, [loadCourses, loadCountry])

    /* ========================================================
       RETRY COURSES
       ======================================================== */

    const handleRetryCourses = () => {
        const controller = new AbortController()

        loadCourses(controller.signal).finally(() => {
            controller.abort()
        })
    }

    /* ========================================================
       RETRY COUNTRY
       ======================================================== */

    const handleRetryCountry = () => {
        const controller = new AbortController()

        loadCountry(controller.signal).finally(() => {
            controller.abort()
        })
    }

    /* ========================================================
       LOADING
       ======================================================== */

    if (coursesLoading) {
        return (
            <div
                className="skillpath-container"
                style={
                    {
                        "--skillpath-accent": accentColor,
                    } as React.CSSProperties
                }
            >
                <LoadingState />
                <SkillpathStyles />
            </div>
        )
    }

    /* ========================================================
       COURSE ERROR
       ======================================================== */

    if (coursesError) {
        return (
            <div
                className="skillpath-container"
                style={
                    {
                        "--skillpath-accent": accentColor,
                    } as React.CSSProperties
                }
            >
                <ErrorState
                    message="We're having trouble loading the courses. The API may be temporarily unavailable."
                    onRetry={handleRetryCourses}
                />

                <SkillpathStyles />
            </div>
        )
    }

    /* ========================================================
       EMPTY
       ======================================================== */

    if (courses.length === 0) {
        return (
            <div
                className="skillpath-container"
                style={
                    {
                        "--skillpath-accent": accentColor,
                    } as React.CSSProperties
                }
            >
                <EmptyState />

                <SkillpathStyles />
            </div>
        )
    }

    /* ========================================================
       MAIN UI
       ======================================================== */

    return (
        <div
            className="skillpath-container"
            style={
                {
                    "--skillpath-accent": accentColor,
                } as React.CSSProperties
            }
        >
            {/* ==================================================
                COUNTRY WARNING
            ================================================== */}

            {countryError && (
                <div
                    className="currency-notice"
                    style={{
                        borderColor: accentColor,
                    }}
                >
                    <div>
                        <strong>Currency detection unavailable.</strong>
                        <span> Prices are currently displayed in USD.</span>
                    </div>

                    <button
                        type="button"
                        className="currency-retry"
                        onClick={handleRetryCountry}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* ==================================================
                COUNTRY LOADING
            ================================================== */}

            {countryLoading && !countryError && (
                <div
                    className="currency-notice"
                    style={{
                        borderColor: accentColor,
                    }}
                >
                    Detecting your currency...
                </div>
            )}

            {/* ==================================================
                COURSE GRID
            ================================================== */}

            <div className="skillpath-grid">
                {courses.map((course) => (
                    <article
                        key={course.courseCode}
                        className="skillpath-card"
                        style={{
                            borderRadius: cardRadius,
                        }}
                    >
                        {/* CATEGORY */}

                        <div
                            className="course-category"
                            style={{
                                color: accentColor,
                            }}
                        >
                            {course.mainCategory}
                        </div>

                        {/* COURSE NAME */}

                        <h3 className="course-name">{course.courseName}</h3>

                        {/* DESCRIPTION */}

                        <p
                            className="course-description"
                            title={
                                course.description ||
                                "No description available."
                            }
                        >
                            {course.description || "No description available."}
                        </p>

                        {/* FOOTER */}

                        <div className="course-footer">
                            <div className="course-price">
                                {countryCode && !countryLoading ? (
                                    formatPrice(course, countryCode)
                                ) : (
                                    <PriceSkeleton />
                                )}
                            </div>

                            <div className="course-badges">
                                <span className="course-type">
                                    {course.courseType}
                                </span>

                                {course.refundable && (
                                    <span className="refundable-badge">
                                        Refundable
                                    </span>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <SkillpathStyles />
        </div>
    )
}

/* ============================================================
   SHARED STYLES
   ============================================================ */

function SkillpathStyles() {
    return (
        <style>{`
            .skillpath-container {
                width: 100%;
                min-height: 300px;
                padding: 24px;
                box-sizing: border-box;
                font-family:
                    Inter,
                    -apple-system,
                    BlinkMacSystemFont,
                    "Segoe UI",
                    sans-serif;
            }

            /* ================================================
               GRID
            ================================================ */

            .skillpath-grid {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 20px;
                box-sizing: border-box;
            }

            /* ================================================
               CARD
            ================================================ */

            .skillpath-card {
                width: 100%;
                min-width: 0;
                min-height: 220px;
                padding: 24px;
                box-sizing: border-box;

                display: flex;
                flex-direction: column;

                background: #ffffff;
                border: 1px solid #e5e7eb;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

                overflow: hidden;
            }

            .course-category {
                margin-bottom: 10px;
                font-size: 13px;
                line-height: 1.3;
                font-weight: 600;
            }

            .course-name {
                margin: 0 0 10px 0;

                font-size: 20px;
                line-height: 1.25;
                font-weight: 700;

                color: #111827;

                overflow-wrap: anywhere;
                word-break: break-word;
            }

            .course-description {
                margin: 0 0 20px 0;

                font-size: 14px;
                line-height: 1.5;

                color: #6b7280;

                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                overflow: hidden;

                overflow-wrap: anywhere;
                word-break: break-word;
            }

            /* ================================================
               FOOTER
            ================================================ */

            .course-footer {
                margin-top: auto;

                display: flex;
                align-items: center;
                justify-content: space-between;

                gap: 12px;
                min-width: 0;
            }

            .course-price {
                min-width: 0;

                font-size: 18px;
                line-height: 1.3;
                font-weight: 700;

                color: #111827;
            }

            .course-badges {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                flex-wrap: wrap;
                gap: 6px;

                min-width: 0;
            }

            .course-type,
            .refundable-badge {
                display: inline-flex;
                align-items: center;

                padding: 5px 8px;

                border-radius: 6px;

                font-size: 12px;
                line-height: 1;
                font-weight: 600;

                white-space: nowrap;
            }

            .course-type {
                background: #f3f4f6;
                color: #4b5563;
            }

            .refundable-badge {
                background: #ecfdf5;
                color: #047857;
            }

            /* ================================================
               CURRENCY NOTICE
            ================================================ */

            .currency-notice {
                width: 100%;

                margin-bottom: 16px;
                padding: 10px 12px;

                display: flex;
                align-items: center;
                justify-content: space-between;

                gap: 12px;

                border: 1px solid;
                border-radius: 8px;

                background: #f9fafb;
                color: #4b5563;

                font-size: 13px;
                line-height: 1.4;

                box-sizing: border-box;
            }

            .currency-retry {
                flex-shrink: 0;

                border: 0;
                border-radius: 6px;

                padding: 6px 10px;

                background: var(--skillpath-accent);
                color: #ffffff;

                font-size: 12px;
                font-weight: 600;

                cursor: pointer;
            }

            .currency-retry:hover {
                opacity: 0.9;
            }

            /* ================================================
               PRICE LOADING
            ================================================ */

            .price-loading {
                display: inline-block;

                width: 64px;
                height: 20px;

                border-radius: 5px;

                background: #e5e7eb;

                position: relative;
                overflow: hidden;
            }

            .price-loading::after {
                content: "";

                position: absolute;
                inset: 0;

                transform: translateX(-100%);

                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.7),
                    transparent
                );

                animation: price-shimmer 1.4s infinite;
            }

            @keyframes price-shimmer {
                100% {
                    transform: translateX(100%);
                }
            }

            /* ================================================
               STATES
            ================================================ */

            .skillpath-state {
                min-height: 300px;

                display: flex;
                flex-direction: column;

                align-items: center;
                justify-content: center;

                padding: 32px;

                text-align: center;
                box-sizing: border-box;
            }

            .state-icon {
                width: 36px;
                height: 36px;

                display: flex;
                align-items: center;
                justify-content: center;

                margin-bottom: 12px;

                border-radius: 50%;

                font-weight: 700;
            }

            .state-error-icon {
                background: #fee2e2;
                color: #dc2626;
            }

            .state-empty-icon {
                width: auto;
                height: auto;

                font-size: 32px;
            }

            .state-title {
                margin: 0 0 6px 0;

                font-size: 17px;
                line-height: 1.3;
                font-weight: 700;

                color: #111827;
            }

            .state-text {
                max-width: 420px;

                margin: 0;

                font-size: 14px;
                line-height: 1.5;

                color: #6b7280;
            }

            .retry-button {
                margin-top: 18px;

                border: 0;
                border-radius: 8px;

                padding: 10px 16px;

                background: var(--skillpath-accent);
                color: #ffffff;

                font-size: 14px;
                font-weight: 600;

                cursor: pointer;
            }

            .retry-button:hover {
                opacity: 0.9;
            }

            /* ================================================
               SKELETON
            ================================================ */

            .skillpath-skeleton-card {
                min-height: 220px;
            }

            .skeleton {
                position: relative;

                overflow: hidden;

                border-radius: 7px;

                background: #e5e7eb;
            }

            .skeleton::after {
                content: "";

                position: absolute;
                inset: 0;

                transform: translateX(-100%);

                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.7),
                    transparent
                );

                animation: skeleton-shimmer 1.4s infinite;
            }

            .skeleton-category {
                width: 90px;
                height: 13px;

                margin-bottom: 14px;
            }

            .skeleton-title {
                width: 82%;
                height: 22px;

                margin-bottom: 8px;
            }

            .skeleton-title-short {
                width: 55%;
                height: 22px;

                margin-bottom: 18px;
            }

            .skeleton-description {
                width: 100%;
                height: 13px;

                margin-bottom: 8px;
            }

            .skeleton-footer {
                margin-top: 24px;

                display: flex;
                align-items: center;
                justify-content: space-between;

                gap: 12px;
            }

            .skeleton-price {
                width: 70px;
                height: 20px;
            }

            .skeleton-badge {
                width: 65px;
                height: 24px;
            }

            @keyframes skeleton-shimmer {
                100% {
                    transform: translateX(100%);
                }
            }

            /* ================================================
               TABLET
               2 COLUMNS
            ================================================ */

            @media (max-width: 1024px) {
                .skillpath-grid {
                    grid-template-columns:
                        repeat(2, minmax(0, 1fr));
                    gap: 16px;
                }
            }

            /* ================================================
               MOBILE
               1 COLUMN
            ================================================ */

            @media (max-width: 600px) {
                .skillpath-container {
                    padding: 16px;
                }

                .skillpath-grid {
                    grid-template-columns: minmax(0, 1fr);
                    gap: 14px;
                }

                .skillpath-card {
                    padding: 20px;
                }

                .course-name {
                    font-size: 18px;
                }

                .course-description {
                    font-size: 14px;
                    line-height: 1.5;
                }

                .course-footer {
                    align-items: flex-start;
                }

                .course-price {
                    font-size: 17px;
                }

                .course-badges {
                    justify-content: flex-start;
                }

                .currency-notice {
                    align-items: flex-start;
                    flex-direction: column;
                }
            }

            /* ================================================
               SMALL PHONES
            ================================================ */

            @media (max-width: 480px) {
                .skillpath-container {
                    padding: 12px;
                }

                .skillpath-grid {
                    gap: 12px;
                }

                .skillpath-card {
                    padding: 16px;
                }

                .course-name {
                    font-size: 17px;
                }

                .course-description {
                    font-size: 13px;
                }

                .course-footer {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .course-price {
                    font-size: 17px;
                }
            }
        `}</style>
    )
}

/* ============================================================
   FRAMER PROPERTY CONTROLS
   ============================================================ */

addPropertyControls(CoursesGrid, {
    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: "#635BFF",
    },

    cardRadius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 16,
        min: 0,
        max: 40,
        step: 1,
        unit: "px",
    },
})
