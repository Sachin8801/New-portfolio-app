import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cloud, 
  Server, 
  Database, 
  Code, 
  GitBranch, 
  Shield, 
  Monitor,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  ChevronDown,
  Container,
  Cpu,
  HardDrive,
  Network,
  Zap,
  Globe,
  Lock,
  Layers,
  Settings,
  Activity
} from 'lucide-react';
import { TypingEffect } from './components/TypingEffect';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { InteractiveSkillBar } from './components/InteractiveSkillBar';
import { ExpandableProjectCard } from './components/ExpandableProjectCard';
import { ContactForm } from './components/ContactForm';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: 'Docker', icon: Container, level: 95, color: 'from-blue-500 to-cyan-400' },
    { name: 'Kubernetes', icon: Server, level: 90, color: 'from-purple-500 to-pink-400' },
    { name: 'AWS', icon: Cloud, level: 88, color: 'from-orange-500 to-yellow-400' },
    { name: 'Terraform', icon: Code, level: 85, color: 'from-green-500 to-emerald-400' },
    { name: 'Jenkins', icon: GitBranch, level: 92, color: 'from-red-500 to-pink-400' },
    { name: 'Monitoring', icon: Monitor, level: 87, color: 'from-indigo-500 to-blue-400' },
    { name: 'Security', icon: Shield, level: 83, color: 'from-yellow-500 to-orange-400' },
    { name: 'Linux', icon: Terminal, level: 95, color: 'from-gray-600 to-gray-400' },
    { name: 'Ansible', icon: Zap, level: 88, color: 'from-red-600 to-red-400' },
    { name: 'Networking', icon: Network, level: 85, color: 'from-teal-500 to-cyan-400' },
    { name: 'Load Balancing', icon: Globe, level: 82, color: 'from-violet-500 to-purple-400' },
    { name: 'Vault', icon: Lock, level: 79, color: 'from-amber-500 to-yellow-400' }
  ];

  const experiences = [
    {
      title: 'Advanced System Engineer',
      company: 'IT by Design',
      period: '2023 - Present',
      achievements: [
        'Reduced deployment time by 75% through CI/CD pipeline optimization',
        'Managed multi-cloud infrastructure serving 10M+ users',
        'Implemented zero-downtime deployments using blue-green strategy'
      ]
    },
    {
      title: 'Support Administrtor',
      company: 'NTT Data Services, Noida',
      period: '2021 - 2023',
      achievements: [
        'Built scalable Kubernetes clusters handling 5000+ pods',
        'Automated infrastructure provisioning with Terraform',
        'Established comprehensive monitoring and alerting systems'
      ]
    },
    {
      title: 'Systems Administrator',
      company: 'Accenture Services, Gurugram',
      period: '2019 - 2021',
      achievements: [
        'Migrated legacy systems to containerized architecture',
        'Implemented backup and disaster recovery procedures',
        'Maintained 99.9% uptime across critical systems'
      ]
    }
  ];

  const projects = [
    {
      title: 'Multi-Cloud K8s Platform',
      description: 'Designed and implemented a multi-cloud Kubernetes platform with automated scaling, monitoring, and security compliance.',
      tech: ['Kubernetes', 'Terraform', 'Prometheus', 'Grafana'],
      impact: '50% cost reduction, 99.99% uptime',
      details: {
        challenge: 'Company needed to migrate from monolithic architecture to microservices while maintaining high availability across multiple cloud providers.',
        solution: 'Implemented a multi-cloud Kubernetes platform using Terraform for infrastructure as code, with automated CI/CD pipelines and comprehensive monitoring.',
        architecture: [
          'Multi-cloud deployment across AWS, Azure, and GCP',
          'Kubernetes clusters with auto-scaling capabilities',
          'Istio service mesh for traffic management',
          'Prometheus and Grafana for monitoring',
          'ArgoCD for GitOps deployment'
        ],
        metrics: [
          { label: 'Cost Reduction', value: '50%', improvement: 'vs previous setup' },
          { label: 'Uptime', value: '99.99%', improvement: 'SLA achievement' },
          { label: 'Deploy Time', value: '5min', improvement: '85% faster' }
        ],
        results: [
          'Reduced infrastructure costs by 50% through optimized resource allocation',
          'Achieved 99.99% uptime with zero-downtime deployments',
          'Improved deployment frequency from weekly to multiple times per day',
          'Enhanced security posture with automated compliance checks'
        ]
      },
      links: {
        github: 'https://github.com/alexthompson/k8s-platform',
        documentation: 'https://docs.company.com/k8s-platform'
      }
    },
    {
      title: 'CI/CD Pipeline Automation',
      description: 'Built comprehensive CI/CD pipelines with automated testing, security scanning, and deployment across multiple environments.',
      tech: ['Jenkins', 'Docker', 'SonarQube', 'HashiCorp Vault'],
      impact: '80% faster deployments, zero security incidents',
      details: {
        challenge: 'Manual deployment processes were causing delays and increasing the risk of human errors in production releases.',
        solution: 'Designed and implemented fully automated CI/CD pipelines with integrated security scanning, automated testing, and progressive deployment strategies.',
        architecture: [
          'Jenkins pipeline with parallel execution',
          'Automated unit, integration, and security testing',
          'Docker containerization with multi-stage builds',
          'HashiCorp Vault for secrets management',
          'Blue-green deployment strategy'
        ],
        metrics: [
          { label: 'Deploy Speed', value: '80%', improvement: 'faster than before' },
          { label: 'Security Issues', value: '0', improvement: 'incidents prevented' },
          { label: 'Test Coverage', value: '95%', improvement: 'automated coverage' }
        ],
        results: [
          'Reduced deployment time from 4 hours to 45 minutes',
          'Eliminated security vulnerabilities through automated scanning',
          'Increased deployment frequency by 300%',
          'Improved code quality with automated testing gates'
        ]
      },
      links: {
        github: 'https://github.com/alexthompson/cicd-automation'
      }
    },
    {
      title: 'Infrastructure as Code',
      description: 'Converted manual infrastructure management to fully automated IaC solution with version control and rollback capabilities.',
      tech: ['Terraform', 'Ansible', 'AWS', 'GitLab'],
      impact: '90% reduction in provisioning time',
      details: {
        challenge: 'Infrastructure was managed manually, leading to inconsistencies, long provisioning times, and difficulty in maintaining environments.',
        solution: 'Implemented comprehensive Infrastructure as Code using Terraform for provisioning and Ansible for configuration management.',
        architecture: [
          'Terraform modules for reusable infrastructure components',
          'Ansible playbooks for configuration management',
          'GitLab CI/CD for infrastructure deployment',
          'AWS CloudFormation integration',
          'Automated testing with Terratest'
        ],
        metrics: [
          { label: 'Provisioning Time', value: '90%', improvement: 'reduction achieved' },
          { label: 'Environment Consistency', value: '100%', improvement: 'across all envs' },
          { label: 'Rollback Time', value: '2min', improvement: 'automated process' }
        ],
        results: [
          'Reduced infrastructure provisioning time from 2 days to 2 hours',
          'Achieved 100% consistency across development, staging, and production',
          'Enabled rapid rollback capabilities with version control',
          'Improved disaster recovery with automated infrastructure recreation'
        ]
      },
      links: {
        github: 'https://github.com/alexthompson/infrastructure-as-code',
        documentation: 'https://docs.company.com/iac-guide'
      }
    }
  ];

  const typingTexts = [
    "Building scalable cloud infrastructure",
    "Automating deployment pipelines", 
    "Orchestrating container workloads",
    "Monitoring system performance",
    "Securing cloud environments"
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Tech Icons */}
        <div className="absolute top-20 left-10 text-blue-400/20 animate-bounce delay-1000">
          <Server className="w-8 h-8" />
        </div>
        <div className="absolute top-40 right-20 text-green-400/20 animate-bounce delay-2000">
          <Database className="w-6 h-6" />
        </div>
        <div className="absolute bottom-40 left-20 text-purple-400/20 animate-bounce delay-3000">
          <Cloud className="w-10 h-10" />
        </div>
        <div className="absolute bottom-20 right-40 text-orange-400/20 animate-bounce delay-4000">
          <Settings className="w-7 h-7" />
        </div>
        <div className="absolute top-1/3 left-1/4 text-cyan-400/20 animate-bounce delay-500">
          <Container className="w-5 h-5" />
        </div>
        <div className="absolute top-2/3 right-1/4 text-pink-400/20 animate-bounce delay-1500">
          <Activity className="w-6 h-6" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-700/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Terminal className="w-6 h-6 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DevOps Portfolio
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`hover:text-cyan-400 transition-all duration-300 capitalize relative ${
                    activeSection === section ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {section}
                  {activeSection === section && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-gray-900/50" />
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <InteractiveTerminal />
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Sachin Singh
              </h1>
              <h2 className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Advanced System Engineer</h2>
              <div className="text-lg text-cyan-400 mb-6 h-8">
                <TypingEffect texts={typingTexts} speed={80} deleteSpeed={40} pauseTime={2000} />
              </div>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                System engineer by day, gym junkie by dawn, party starter by weekend. I fix servers, lift weights, and still make time to                 enjoy the perks of work-life balance—tech, tunes, and tacos included.
              </p>
              <div className="flex space-x-4">
                <a href="#contact" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-cyan-500/25">
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                </a>
                <a href="#projects" className="border border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10 px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  View Projects
                </a>
              </div>
            </div>
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg blur opacity-30"></div>
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 border border-gray-600/50">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-400/20">
                        <Cloud className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold mb-1">Cloud Native</h3>
                      <p className="text-sm text-gray-400">AWS, Azure, GCP</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-400/20">
                        <Container className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="font-semibold mb-1">Containers</h3>
                      <p className="text-sm text-gray-400">Docker, K8s</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-orange-400/20">
                        <GitBranch className="w-8 h-8 text-orange-400" />
                      </div>
                      <h3 className="font-semibold mb-1">CI/CD</h3>
                      <p className="text-sm text-gray-400">Jenkins, GitLab</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-green-400/20">
                        <Monitor className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="font-semibold mb-1">Monitoring</h3>
                      <p className="text-sm text-gray-400">Prometheus, Grafana</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-6 h-6 text-cyan-400 animate-bounce" />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-r from-gray-800/50 via-blue-900/20 to-purple-900/20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/5"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Expertise
            </h2>
            <p className="text-xl text-gray-400">Technologies and tools I work with daily</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <InteractiveSkillBar
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                level={skill.level}
                color={skill.color}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-400">My journey in DevOps and infrastructure</p>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-6 shadow-lg shadow-cyan-400/50"></div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-gray-800/80 to-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-gray-600/50 hover:border-cyan-400/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{exp.title}</h3>
                        <p className="text-lg text-gray-300">{exp.company}</p>
                      </div>
                      <div className="text-gray-400 mt-2 md:mt-0">{exp.period}</div>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-green-400/50"></div>
                          <span className="text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {index < experiences.length - 1 && (
                  <div className="absolute left-2 top-10 w-px h-full bg-gradient-to-b from-cyan-400/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-r from-purple-900/20 via-gray-800/50 to-blue-900/20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-blue-500/5"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400">Key infrastructure and automation projects</p>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ExpandableProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Ready to discuss your infrastructure needs or explore collaboration opportunities?
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Get in Touch</h3>
              <div className="grid gap-6">
                <a href="mailto:alex@devopsexpert.com" className="bg-gradient-to-br from-gray-800/80 to-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-gray-600/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-4 hover:shadow-lg hover:shadow-cyan-400/10">
                  <div className="relative">
                    <Mail className="w-8 h-8 text-cyan-400" />
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm"></div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-400">shelbysingh.itbd.net</p>
                  </div>
                </a>
                <a href="https://linkedin.com/in/alexthompson" className="bg-gradient-to-br from-gray-800/80 to-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-gray-600/50 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-4 hover:shadow-lg hover:shadow-blue-400/10">
                  <div className="relative">
                    <Linkedin className="w-8 h-8 text-blue-400" />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm"></div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold mb-1">LinkedIn</h4>
                    <p className="text-gray-400">Connect professionally</p>
                  </div>
                </a>
                <a href="https://github.com/alexthompson" className="bg-gradient-to-br from-gray-800/80 to-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-gray-600/50 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-4 hover:shadow-lg hover:shadow-purple-400/10">
                  <div className="relative">
                    <Github className="w-8 h-8 text-purple-400" />
                    <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm"></div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold mb-1">GitHub</h4>
                    <p className="text-gray-400">View my repositories</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-800/60 backdrop-blur-sm rounded-lg p-8 border border-gray-600/50">
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Current Availability</h3>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-green-400 font-medium">Available for new opportunities</span>
            </div>
            <p className="text-gray-400">
              Open to discussing full-time positions, consulting engagements, or interesting projects in DevOps, 
              cloud architecture, and infrastructure automation.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900/20 to-purple-900/20 border-t border-gray-700/50 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm"></div>
            </div>
            <span className="text-gray-300">© 2025 Sachin Singh - DevOps Engineer</span>
          </div>
          <p className="text-sm text-gray-500">Building the future, one deployment at a time.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
