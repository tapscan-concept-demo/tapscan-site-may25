// TapScan legal page content + renderer.
//
// Sourced 1:1 from the attached Figma file "TapScanLegalPages.fig"
// (Page-1 / Terms-Conditions, Terms---Cookies, Acceptable-Use, Privacy).
// Wording is preserved verbatim including the Figma's own quirks
// (e.g. the Cookies page heading reads "Acceptable Use Policy" because
// that is exactly what is in the source).
//
// Heading levels per Figma type sizes:
//   lvl 1 → 32px / 900       (page-level section heading)
//   lvl 2 → 24px / 900       (top-level sub-section)
//   lvl 3 → 18px / 700       (deeper sub-section)
//
// Paragraphs containing "\n" are rendered as bullet lists (each line is
// an item) unless the block opts out via { contact: true }.

const LP_TEXT = "#212331";

// ──────────────────────────────────────────────────────────────
// TERMS & CONDITIONS
// ──────────────────────────────────────────────────────────────
const LP_TERMS = [
  { lvl: 1, h: "Ahead of the Curve Group Terms of Service", p: [
    "These Terms of Service govern your use of the website located at https://tapscan.info and any related services provided by Ahead of the Curve Group.",
    "By accessing https://tapscan.info, you agree to abide by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these Terms of Service, you are prohibited from using or accessing this website or using any other services provided by Ahead of the Curve Group.",
    "We, Ahead of the Curve Group, reserve the right to review and amend any of these Terms of Service at our sole discretion. Upon doing so, we will update this page. Any changes to these Terms of Service will take effect immediately from the date of publication.",
    "These Terms of Service were last updated on May 16, 2025.",
  ] },
  { lvl: 2, h: "Limitations of Use", p: [
    "By using this website, you warrant on behalf of yourself, your users, and other parties you represent that you will not:",
    "modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and software contained on this website;\nremove any copyright or other proprietary notations from any materials and software on this website;\ntransfer the materials to another person or \"mirror\" the materials on any other server;\nknowingly or negligently use this website or any of its associated services in a way that abuses or disrupts our networks or any other service Ahead of the Curve Group provides;\nuse this website or its associated services to transmit or publish any harassing, indecent, obscene, fraudulent, or unlawful material;\nuse this website or its associated services in violation of any applicable laws or regulations;\nuse this website in conjunction with sending unauthorized advertising or spam;\nharvest, collect, or gather user data without the user's consent; or\nuse this website or its associated services in such a way that may infringe the privacy, intellectual property rights, or other rights of third parties.",
  ] },
  { lvl: 2, h: "Intellectual Property", p: [
    "The intellectual property in the materials contained in this website are owned by or licensed to Ahead of the Curve Group and are protected by applicable copyright and trademark law. We grant our users permission to download one copy of the materials for personal, non-commercial transitory use.",
    "This constitutes the grant of a license, not a transfer of title. This license shall automatically terminate if you violate any of these restrictions or the Terms of Service, and may be terminated by Ahead of the Curve Group at any time.",
  ] },
  { lvl: 2, h: "Liability", p: [
    "Our website and the materials on our website are provided on an 'as is' basis. To the extent permitted by law, Ahead of the Curve Group makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property, or other violation of rights.",
    "In no event shall Ahead of the Curve Group or its suppliers be liable for any consequential loss suffered or incurred by you or any third party arising from the use or inability to use this website or the materials on this website, even if Ahead of the Curve Group or an authorized representative has been notified, orally or in writing, of the possibility of such damage.",
    "In the context of this agreement, \"consequential loss\" includes any consequential loss, indirect loss, real or anticipated loss of profit, loss of benefit, loss of revenue, loss of business, loss of goodwill, loss of opportunity, loss of savings, loss of reputation, loss of use and/or loss or corruption of data, whether under statute, contract, equity, tort (including negligence), indemnity or otherwise.",
    "Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.",
  ] },
  { lvl: 2, h: "Accuracy of Materials", p: [
    "The materials appearing on our website are not comprehensive and are for general information purposes only. Ahead of the Curve Group does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on this website, or otherwise relating to such materials or on any resources linked to this website.",
  ] },
  { lvl: 2, h: "Links", p: [
    "Ahead of the Curve Group has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement, approval or control by Ahead of the Curve Group of the site. Use of any such linked site is at your own risk and we strongly advise you make your own investigations with respect to the suitability of those sites.",
  ] },
  { lvl: 2, h: "Right to Terminate", p: [
    "We may suspend or terminate your right to use our website and terminate these Terms of Service immediately upon written notice to you for any breach of these Terms of Service.",
  ] },
  { lvl: 2, h: "Severance", p: [
    "Any term of these Terms of Service which is wholly or partially void or unenforceable is severed to the extent that it is void or unenforceable. The validity of the remainder of these Terms of Service is not affected.",
  ] },
  { lvl: 2, h: "Governing Law", p: [
    "These Terms of Service are governed by and construed in accordance with the laws of Canada. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.",
  ] },
];

// ──────────────────────────────────────────────────────────────
// COOKIES — Figma source has the top heading "Ahead of the Curve
// Group Acceptable Use Policy" verbatim (likely a Figma authoring
// slip but reproduced 1:1 as requested).
// ──────────────────────────────────────────────────────────────
const LP_COOKIES = [
  { lvl: 1, h: "Ahead of the Curve Group Acceptable Use Policy", p: [
    "Effective Date: September 3, 2024",
    "We use cookies to help improve your experience of our website at https://tapscan.info. This cookie policy is part of Ahead of the Curve Group's privacy policy. It covers the use of cookies between your device and our site.",
    "We also provide basic information on third-party services we may use, who may also use cookies as part of their service. This policy does not cover their cookies.",
    "If you don\u2019t wish to accept cookies from us, you should instruct your browser to refuse cookies from https://tapscan.info. In such a case, we may be unable to provide you with some of your desired content and services.",
  ] },
  { lvl: 2, h: "What is a cookie?", p: [
    "A cookie is a small piece of data that a website stores on your device when you visit. It typically contains information about the website itself, a unique identifier that allows the site to recognise your web browser when you return, additional data that serves the cookie\u2019s purpose, and the lifespan of the cookie itself.",
    "Cookies are used to enable certain features (e.g. logging in), track site usage (e.g. analytics), store your user settings (e.g. time zone, notification preferences), and to personalize your content (e.g. advertising, language).",
    "Cookies set by the website you are visiting are usually referred to as first-party cookies. They typically only track your activity on that particular site.",
    "Cookies set by other sites and companies (i.e. third parties) are called third-party cookies. They can be used to track you on other websites that use the same third-party service.",
  ] },
  { lvl: 2, h: "Types of cookies and how we use them", p: [] },
  { lvl: 3, h: "Performance cookies", p: [
    "Performance cookies track how you use a website during your visit. Typically, this information is anonymous and aggregated, with information tracked across all site users. They help companies understand visitor usage patterns, identify and diagnose problems or errors their users may encounter, and make better strategic decisions in improving their audience\u2019s overall website experience. These cookies may be set by the website you\u2019re visiting (first-party) or by third-party services. They do not collect personal information about you.",
    "We use performance cookies on our site.",
  ] },
  { lvl: 3, h: "Functionality cookies", p: [
    "Functionality cookies are used to collect information about your device and any settings you may configure on the website you\u2019re visiting (like language and time zone settings). With this information, websites can provide you with customized, enhanced, or optimized content and services. These cookies may be set by the website you\u2019re visiting (first-party) or by third-party services.",
    "We use functionality cookies for selected features on our site.",
  ] },
  { lvl: 3, h: "How Can You Control Our Website's Use of Cookies?", p: [
    "You have the right to decide whether to accept or reject cookies on our Website. You can manage your cookie preferences in our Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with the services on our Website.",
    "You may also be able to set or amend your cookie preferences by managing your web browser settings. As each web browser is different, please consult the instructions provided by your web browser (typically in the \"help\" section). If you choose to refuse or disable cookies you may still use the Website, though some of the functionality of the Website may not be available to you.",
  ] },
  { lvl: 3, h: "How Often Will We Update This Cookie Policy?", p: [
    "We may update this Cookie Policy from time to time in order to reflect any changes to the cookies and related technologies we use, or for other operational, legal or regulatory reasons.",
    "Each time you use our Website, the current version of the Cookie Policy will apply. When you use our Website, you should check the date of this Cookie Policy (which appears at the top of this document) and review any changes since the last version.",
  ] },
  { lvl: 3, h: "Where Can You Obtain Further Information?", p: [
    "For any questions or concerns regarding our Cookie Policy, you may contact us using the following details:",
    { contact: ["John Snow", "https://tapscan.info/ts-about-us/"] },
  ] },
];

// ──────────────────────────────────────────────────────────────
// ACCEPTABLE USE
// Note: the Figma has a second identical "Customer Accountability"
// block immediately after the first \u2014 reproduced 1:1 as requested.
// ──────────────────────────────────────────────────────────────
const LP_AU_CUSTOMER_PARAGRAPHS = [
  "We regard our customers as being responsible for their own actions as well as for the actions of anyone using our Products with the customer's permission. This responsibility also applies to anyone using our Products on an unauthorized basis as a result of the customer's failure to put in place reasonable security measures.",
  "By accepting Products from us, our customers agree to ensure adherence to this policy on behalf of anyone using the Products as their end users. Complaints regarding the actions of customers or their end-users will be forwarded to the nominated contact for the account in question.",
  "If a customer - or their end-user or anyone using our Products as a result of the customer - violates our acceptable use policy, we reserve the right to terminate any Products associated with the offending account or the account itself or take any remedial or preventative action we deem appropriate without notice. To the extent permitted by law, no credit will be available for interruptions of service resulting from any violation of our acceptable use policy.",
];

const LP_ACCEPTABLE_USE = [
  { lvl: 1, h: "Ahead of the Curve Group Acceptable Use Policy", p: [
    "TapScan was founded in 2018 as part of Ahead of the Curve Group. It\u2019s co-founders are former leaders in brand marketing, design, and global customer packaging with CPG companies including Nestle and Unilever.",
    "Ahead of the Curve Group customers found engaging in activities prohibited by this acceptable use policy can be liable for service suspension and account termination. In extreme cases, we may be legally obliged to report such customers to the relevant authorities.",
    "This policy was last reviewed on May 16, 2025.",
  ] },
  { lvl: 2, h: "Fair use", p: [
    "We provide our facilities with the assumption your use will be \"business as usual\", as per our offer schedule. If your use is considered to be excessive, then additional fees may be charged or capacity may be restricted.",
    "We are opposed to all forms of abuse, discrimination, rights infringement and/or any action that harms or disadvantages any group, individual or resource. We expect our customers and, where applicable, their users (\"end-users\") to likewise engage our Products with similar intent.",
  ] },
  { lvl: 2, h: "Customer Accountability", p: LP_AU_CUSTOMER_PARAGRAPHS },
  { lvl: 2, h: "Customer Accountability", p: LP_AU_CUSTOMER_PARAGRAPHS },
  { lvl: 2, h: "Prohibited activity", p: [] },
  { lvl: 3, h: "Copyright infringement and access to unauthorized material", p: [
    "Our Products must not be used to transmit, distribute or store any material in violation of any applicable law. This includes but isn't limited to:\n\nany material protected by copyright, trademark, trade secret or other intellectual property right used without proper authorization, and\n\nany material that is obscene, defamatory, constitutes an illegal threat or violates export control laws.\nThe customer is solely responsible for all material they input, upload, disseminate, transmit, create or publish through or on our Products, and for obtaining legal permission to use any works included in such material.",
  ] },
  { lvl: 3, h: "SPAM and unauthorized message activity", p: [
    "Our Products must not be used for the purpose of sending unsolicited bulk or commercial messages in violation of the laws and regulations applicable to your jurisdiction (\"spam\"). This includes but isn't limited to sending spam, soliciting customers from spam sent from other service providers, and collecting replies to spam sent from other service providers.",
    "Our Products must not be used for the purpose of running unconfirmed mailing lists or telephone number lists (\"messaging lists\"). This includes but isn't limited to subscribing email addresses or telephone numbers to any messaging list without the permission of the email address or telephone number owner, and storing any email addresses or telephone numbers subscribed in this way. All messaging lists run on or hosted by our Products must be \"confirmed opt-in\". Verification of the address or telephone number owner's express permission must be available for the lifespan of the messaging list.",
    "We prohibit the use of email lists, telephone number lists or databases purchased from third parties intended for spam or unconfirmed messaging list purposes on our Products.",
    "This spam and unauthorized message activity policy applies to messages sent using our Products, or to messages sent from any network by the customer or any person on the customer's behalf, that directly or indirectly refer the recipient to a site hosted via our Products.",
  ] },
  { lvl: 3, h: "Unethical, exploitative, and malicious activity", p: [
    "Our Products must not be used for the purpose of advertising, transmitting or otherwise making available any software, program, product or service designed to violate this acceptable use policy, or the acceptable use policy of other service providers. This includes but isn't limited to facilitating the means to send spam and the initiation of network sniffing, pinging, packet spoofing, flooding, mail-bombing and denial-of-service attacks.",
    "Our Products must not be used to access any account or electronic resource where the group or individual attempting to gain access does not own or is not authorized to access the resource (e.g. \"hacking\", \"cracking\", \"phreaking\", etc.).",
    "Our Products must not be used for purposely engaging in activities designed to harass another group or individual. Our definition of harassment includes but is not limited to denial-of-service attacks, hate-speech, advocacy of racial or ethnic intolerance, and any activity intended to threaten, abuse, infringe upon the rights of or discriminate against any group or individual.",
    "Other activities considered unethical, exploitative and malicious include:\n\nObtaining (or attempting to obtain) services from us with the intent to avoid payment;\n\nUsing our facilities to obtain (or attempt to obtain) services from another provider with the intent to avoid payment;\n\nThe unauthorized access, alteration or destruction (or any attempt thereof) of any information about our customers or end-users, by any means or device;\n\nUsing our facilities to interfere with the use of our facilities and network by other customers or authorized individuals;\n\nPublishing or transmitting any content of links that incite violence, depict a violent act, depict child pornography or threaten anyone's health and safety;\n\nAny act or omission in violation of consumer protection laws and regulations;\n\nAny violation of a person's privacy.",
    "Our Products may not be used by any person or entity, which is involved with or suspected of involvement in activities or causes relating to illegal gambling; terrorism; narcotics trafficking; arms trafficking or the proliferation, development, design, manufacture, production, stockpiling, or use of nuclear, chemical or biological weapons, weapons of mass destruction, or missiles; in each case including any affiliation with others whatsoever who support the above such activities or causes.",
  ] },
  { lvl: 2, h: "Unauthorized use of Ahead of the Curve Group property", p: [
    "We prohibit the impersonation of Ahead of the Curve Group, the representation of a significant business relationship with Ahead of the Curve Group, or ownership of any Ahead of the Curve Group property (including our Products and brand) for the purpose of fraudulently gaining service, custom, patronage or user trust.",
  ] },
  { lvl: 2, h: "About this policy", p: [
    "This policy outlines a non-exclusive list of activities and intent we deem unacceptable and incompatible with our brand.",
    "We reserve the right to modify this policy at any time by publishing the revised version on our website. The revised version will be effective from the earlier of:",
    "the date the customer uses our Products after we publish the revised version on our website; or\n30 days after we publish the revised version on our website.",
  ] },
];

// Export so the renderer + the privacy file (loaded separately) can find them.
window.LP_TEXT = LP_TEXT;
window.LP_TERMS = LP_TERMS;
window.LP_COOKIES = LP_COOKIES;
window.LP_ACCEPTABLE_USE = LP_ACCEPTABLE_USE;
