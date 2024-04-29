const IDS = [];
const ID_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateId() {
  let time = (new Date()).getTime();
  let i = 0;
  let sid = '';

  while ( time > 0 ) {
    const j = time%ID_CHARS.length;
    sid = ID_CHARS.charAt(j) + sid;
    time = Math.floor(time/ID_CHARS.length);
  }

  if (IDS[sid]) {
      i = IDS[sid] + 1;
  }

  IDS[sid] = i;
  return sid + ( i > 0 ? i : '' );
}

export class TextData {
    constructor(text) {
        this.id = generateId();
        this.node = null;
        this.text = text;
    }
    getNode(document) {
        if (!this.node) {
            this.node = document.createElement('div');
            this.node.setAttribute('id', this.id);
            this.node.innerHTML = this.text;
        }
        return this.node;
    }
    getWidth() {
        if (!this.node) {
            return 0;
        }
        return this.node.clientWidth;
    }
    getHeight() {
        if (!this.node) {
            return 0;
        }
        return this.node.clientHeight;
    }
}

export const html1 = [
  new TextData("<h1>The Tale of Plumplori's Code Quest</h1>"),
  new TextData("<p>Once upon a time, in the bustling world of programming, there lived a curious and determined Plumplori named Codey. Codey was known throughout the coding community for his insatiable appetite for problem-solving and his unwavering dedication to perfecting his craft.</p>"),
  new TextData("<p>One fateful day, as Codey embarked on a new coding project, he encountered a vexing challenge—a stubborn little error that seemed to evade his every attempt to squash it. Despite his frustration, Codey refused to be deterred. With steely determination, he dove headfirst into the depths of his code, determined to unearth the elusive bug.</p>"),
  new TextData("<p>Hours turned into days as Codey poured over lines of code, meticulously tracing each variable and function, searching for the source of the error. His eyes grew weary, his fingers cramped, but still, he persisted, fueled by his unwavering determination to conquer the code.</p>"),
  new TextData("<p>And then, just when all hope seemed lost, a glimmer of insight struck Codey like a bolt of lightning. With a newfound clarity, he followed a hunch, scrutinizing a seemingly innocuous line of code that had eluded his attention thus far. And there it was, hidden in plain sight—a misplaced semicolon, the culprit behind all his woes.</p>"),
  new TextData("<p>With a triumphant cry, Codey swiftly corrected the error, his fingers dancing across the keyboard as he eagerly compiled his code once more. And lo and behold, the error vanished, replaced by the sweet satisfaction of success.</p>"),
  new TextData("<p>As Codey basked in the glow of his victory, he realized that the true reward lay not in the resolution of the error itself, but in the journey of discovery and perseverance that had led him there. And so, with renewed vigor and a newfound sense of accomplishment, Codey marched forward, ready to tackle whatever challenges lay ahead in his coding adventures.</p>")
];
export const html2 = [
    new TextData('<h1>Evolution of IT Systems</h1>'),
    new TextData([
        '<h2>Introduction</h2>',
        '<p>Information Technology (IT) systems have undergone a remarkable evolution over the decades, reshaping how businesses operate and individuals interact with technology. This journey of transformation is marked by significant milestones, innovations, and paradigm shifts.</p>'
    ].join('')),
    new TextData([
        '<h2>Early Beginnings</h2>',
        '<p>The roots of IT systems trace back to the mid-20th century, with the advent of mainframe computers. These colossal machines were the pioneers in data processing, primarily used by large organizations for complex calculations and data management tasks. However, accessibility was limited, and interaction was confined to trained operators.</p>'
    ].join('')),
    new TextData([
        '<h2>Rise of Personal Computing</h2>',
        '<p>The 1970s witnessed a monumental shift with the emergence of personal computing. Innovations like the Altair 8800 and the Apple I brought computing power to individuals\' homes and workplaces. This era marked the democratization of technology, empowering users to interact directly with computers through graphical user interfaces (GUIs) and operating systems like MS-DOS and Apple DOS.</p>'
    ].join('')),
    new TextData([
        '<h2>Networking and Internet Revolution</h2>',
        '<p>The late 20th century saw the proliferation of computer networks, culminating in the birth of the internet. This interconnected web of computers revolutionized communication, commerce, and collaboration on a global scale. Protocols such as TCP/IP became the backbone of internet communication, paving the way for the World Wide Web and e-commerce platforms.</p>'
    ].join('')),
    new TextData([
        '<h2>Era of Enterprise Systems</h2>',
        '<p>As businesses expanded globally, the demand for scalable and integrated IT solutions surged. Enterprise Resource Planning (ERP) systems emerged to streamline business processes, encompassing functions like finance, human resources, and supply chain management. Companies embraced Customer Relationship Management (CRM) systems to enhance customer interactions and loyalty.</p>'
    ].join('')),
    new TextData([
        '<h2>Cloud Computing and Virtualization</h2>',
        '<p>The 21st century ushered in the era of cloud computing, offering unprecedented scalability, flexibility, and cost-efficiency. Virtualization technologies enabled the efficient utilization of hardware resources, leading to the proliferation of cloud services from providers like Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). Organizations migrated their infrastructure and applications to the cloud, accelerating innovation and digital transformation.</p>'
    ].join('')),
    new TextData([
        '<h2>Emergence of Big Data and Analytics</h2>',
        '<p>The exponential growth of data generated a pressing need for advanced analytics solutions. Big Data technologies like Hadoop and Spark emerged to process and derive insights from massive datasets. Predictive analytics, machine learning, and artificial intelligence became integral components of modern IT systems, empowering organizations to make data-driven decisions and gain a competitive edge.</p>'
    ].join('')),
    new TextData([
        '<h2>Future Trends and Challenges</h2>',
        '<p>The evolution of IT systems shows no signs of slowing down. Emerging technologies such as blockchain, Internet of Things (IoT), and edge computing are poised to reshape industries and redefine how we interact with technology. However, with innovation comes challenges, including cybersecurity threats, data privacy concerns, and ethical implications of AI. Addressing these challenges will be crucial in navigating the future landscape of IT systems.</p>'
    ].join('')),
    new TextData([
        '<h2>Conclusion</h2>',
        '<p>From the early days of mainframe computing to the era of cloud-native applications and AI-driven insights, the evolution of IT systems reflects humanity\'s relentless pursuit of innovation and progress. As we stand on the brink of a new technological frontier, it\'s essential to learn from the past, adapt to changing landscapes, and harness the power of technology responsibly for the betterment of society.</p>'
    ].join(''))
];
export const html3 = [
  new TextData([
    "<h1>The Power and Potential of Artificial Intelligence (AI)</h1>",
    "<p>Artificial Intelligence (AI) has emerged as one of the most transformative technologies of the 21st century, revolutionizing industries, enhancing productivity, and reshaping our daily lives. From intelligent virtual assistants to autonomous vehicles, AI applications are ubiquitous and continue to evolve at a rapid pace.</p>"
  ].join('')),
  new TextData([
    "<h2>Understanding Artificial Intelligence</h2>",
    "<p>At its core, AI refers to the simulation of human intelligence in machines, enabling them to perform tasks that typically require human cognitive functions such as learning, problem-solving, and decision-making. Unlike traditional computer programs, AI systems can analyze vast amounts of data, identify patterns, and make predictions or recommendations based on that analysis.</p>"
  ].join('')),
  new TextData([
    "<h3>Types of Artificial Intelligence</h3>",
    "<p>There are various categories of AI, ranging from narrow AI, which is designed to perform specific tasks, to general AI, which exhibits human-like intelligence across a wide range of activities. Machine learning, a subset of AI, enables systems to improve their performance over time by learning from data without being explicitly programmed.</p>"
  ].join('')),
  new TextData([
    "<h3>Applications of Artificial Intelligence</h3>",
    "<p>The applications of AI span across diverse domains, including healthcare, finance, transportation, retail, and entertainment. In healthcare, AI-powered systems are used for medical imaging analysis, drug discovery, and personalized treatment recommendations. In finance, AI algorithms drive trading strategies, fraud detection, and risk management.</p>"
  ].join('')),
  new TextData([
    "<h2>Challenges and Ethical Considerations</h2>",
    "<p>Despite its immense potential, AI also presents significant challenges and ethical considerations. Concerns about job displacement due to automation, algorithmic bias, and the misuse of AI for surveillance or manipulation have sparked debates about regulation and responsible AI development. Ensuring transparency, fairness, and accountability in AI systems is paramount to building trust and mitigating risks.</p>"
  ].join('')),
  new TextData([
    "<h3>The Future of Artificial Intelligence</h3>",
    "<p>Looking ahead, the future of AI holds boundless possibilities. Advancements in deep learning, natural language processing, and robotics are poised to unlock new capabilities and applications. As AI technologies continue to mature, collaboration between industry, academia, and policymakers will be essential to harnessing its benefits while addressing its challenges.</p>"
  ].join('')),
  new TextData([
    "<h2>Conclusion</h2>",
    "<p>Artificial Intelligence represents a paradigm shift in how we perceive and interact with technology. As AI continues to permeate every aspect of our society, it's crucial to approach its development and deployment with foresight, responsibility, and a commitment to ethical principles. By leveraging the power of AI responsibly, we can unlock its full potential to create a better, more equitable future for all.</p>"
  ].join(''))
];
