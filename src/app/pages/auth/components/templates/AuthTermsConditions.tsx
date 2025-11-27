import { useEffect, useRef, useState } from "react";

type Props = {
    confirm?: () => void;
};

const AuthTermsConditions = ({ confirm }: Props) => {
    const legend = useRef<HTMLDivElement|null>(null); 
    const [canAccept, setCanAccept] = useState(false);

    useEffect(() => {
        const el = legend.current;
        if (!el) return;

        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const bottomReached = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;
            setCanAccept(bottomReached);
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <div ref={legend} style={{ maxHeight: '50vh', textAlign: 'left', overflow: 'auto'}}>
                <h1>Terms and Conditions of Use - Archeota</h1>
                <p>
                    Welcome to <strong>Archeota</strong>, a digital platform that provides tools for managing
                    &nbsp; <strong>claims</strong>, <strong>stock transactions</strong>, inventory operations, and
                    <strong>&nbsp;AI-powered assistance</strong> related to high-value assets and activities.
                    By accessing or using our services, you agree to comply with these Terms and Conditions.
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By creating an account or using any Archeota service, you acknowledge that:
                </p>
                <ul>
                    <li>You have read and understood these Terms.</li>
                    <li>You agree to be bound by them.</li>
                    <li>You have the legal capacity to use the platform.</li>
                </ul>
                <p>
                    If you do not agree with these Terms, you must discontinue use of the platform immediately.
                </p>

                <h2>2. Description of Services</h2>
                <p>Archeota provides, among others, the following services:</p>
                <ol>
                    <li>Tools for recording, managing, and tracking <strong>claims</strong>.</li>
                    <li>Inventory and <strong>stock transaction</strong> management capabilities.</li>
                    <li>AI-powered tools for analysis, assistance, and content generation.</li>
                    <li>Additional features and integrations as the platform evolves.</li>
                </ol>
                <p>
                    Archeota reserves the right to modify, suspend, or discontinue any feature without prior notice.
                </p>

                <h2>3. User Accounts and Registration</h2>
                <p>
                    Some services require you to create an account. You agree to:
                </p>
                <ul>
                    <li>Provide accurate and up-to-date information.</li>
                    <li>Keep your login credentials confidential.</li>
                    <li>Notify us immediately of any unauthorized use of your account.</li>
                </ul>
                <p>
                    Archeota may suspend or terminate accounts that violate these Terms.
                </p>

                <h2>4. Permitted Use</h2>
                <p>
                    You agree to use the platform only for lawful and legitimate purposes. You must not:
                </p>
                <ul>
                    <li>Modify, manipulate, or falsify system data.</li>
                    <li>Attempt to access accounts, systems, or data without authorization.</li>
                    <li>Interfere with the security, performance, or integrity of the platform.</li>
                    <li>Use AI features for illegal, harmful, or abusive activities.</li>
                </ul>
                <p>
                    Archeota may restrict or suspend access for users who violate these rules.
                </p>

                <h2>5. Limitations of AI Services</h2>
                <p>
                    AI-generated responses are provided for informational and operational assistance only.
                    You acknowledge that:
                </p>
                <ul>
                    <li>AI output may contain errors or inaccuracies.</li>
                    <li>AI content does not constitute financial, legal, or professional advice.</li>
                    <li>You are solely responsible for how you use AI-generated information.</li>
                </ul>

                <h2>6. Transactions and Operations</h2>
                <p>
                    Archeota may facilitate stock transactions, movements, and inventory operations. You agree that:
                </p>
                <ul>
                    <li>All operations performed under your account will be deemed authorized by you.</li>
                    <li>
                    Archeota is not responsible for losses resulting from user error, incomplete data,
                    or misuse of the platform.
                    </li>
                    <li>
                    You are responsible for verifying the accuracy of all information before confirming any transaction.
                    </li>
                </ul>

                <h2>7. Intellectual Property</h2>
                <p>
                    All content, trademarks, logos, interfaces, databases, AI models, and platform designs
                    are the exclusive property of Archeota. Reproduction, distribution, or modification is
                    prohibited without written authorization.
                </p>

                <h2>8. Privacy and Data Protection</h2>
                <p>
                    Archeota collects and processes personal data in accordance with its
                    <strong>Privacy Policy</strong>. By using the platform, you consent to such processing.
                </p>

                <h2>9. Liability and Limitations</h2>
                <p>
                    Archeota does not guarantee that the service will be:
                </p>
                <ul>
                    <li>Error-free,</li>
                    <li>Uninterrupted,</li>
                    <li>Free from security vulnerabilities or data loss.</li>
                </ul>
                <p>
                    Archeota is not liable for:
                </p>
                <ul>
                    <li>
                    Direct, indirect, incidental, or consequential damages resulting from the use or inability
                    to use the service.
                    </li>
                    <li>
                    Decisions made based on AI-generated or system-generated information.
                    </li>
                </ul>

                <h2>10. Suspension and Termination</h2>
                <p>
                    Archeota may suspend or terminate your account if:
                </p>
                <ul>
                    <li>You violate these Terms.</li>
                    <li>You engage in fraudulent or unlawful activities.</li>
                    <li>You compromise the security or integrity of the platform.</li>
                </ul>
                <p>
                    You may also request account termination at any time.
                </p>

                <h2>11. Modifications to the Terms</h2>
                <p>
                    Archeota may update these Terms at any time. Continued use of the platform after such
                    updates constitutes acceptance of the revised Terms.
                </p>

                <h2>12. Governing Law</h2>
                <p>
                    These Terms are governed by the laws applicable in the jurisdiction in which Archeota operates
                    or as specified in contractual agreements.
                </p>

                <h2>13. Contact</h2>
                <p>
                    For questions, support, or inquiries related to these Terms, please contact:
                </p>
                <p>
                    <strong>Email:</strong> <a href="mailto:support@archeota.com">support@archeota.com</a>
                </p>
                <hr />
                <p><em>This document is a generic template and does not constitute legal advice.</em></p>
            </div>
            <div className="separator mt-5 mb-5"></div>
            <button className="btn btn-primary" onClick={confirm} disabled={!canAccept}>
                Confirm terms and conditions
            </button>
        </>
    )
}

export default AuthTermsConditions;