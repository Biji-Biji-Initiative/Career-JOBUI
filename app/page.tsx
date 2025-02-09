"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  BriefcaseIcon,
  FileTextIcon,
  GraduationCapIcon,
  MessageSquareIcon,
  RefreshCwIcon,
  UserIcon,
} from 'lucide-react';
import { ChatInterface } from '@/components/chat-interface';
import { UserProfile } from '@/components/user-profile';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('welcome');
  const [progress, setProgress] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              Career Compass
            </h1>
            <p className="text-lg text-blue-700 dark:text-blue-300">
              Your AI-powered career guidance companion
            </p>
          </div>

          {showLogin ? (
            <UserProfile onClose={() => setShowLogin(false)} />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                <TabsTrigger value="welcome" className="data-[state=active]:bg-blue-100">
                  <MessageSquareIcon className="w-4 h-4 mr-2" />
                  Welcome
                </TabsTrigger>
                <TabsTrigger value="assessment" className="data-[state=active]:bg-blue-100">
                  <GraduationCapIcon className="w-4 h-4 mr-2" />
                  Assessment
                </TabsTrigger>
                <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-100">
                  <BriefcaseIcon className="w-4 h-4 mr-2" />
                  Jobs
                </TabsTrigger>
                <TabsTrigger value="resume" className="data-[state=active]:bg-blue-100">
                  <FileTextIcon className="w-4 h-4 mr-2" />
                  Resume
                </TabsTrigger>
                <TabsTrigger value="interview" className="data-[state=active]:bg-blue-100">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Interview
                </TabsTrigger>
                <TabsTrigger value="change" className="data-[state=active]:bg-blue-100">
                  <RefreshCwIcon className="w-4 h-4 mr-2" />
                  Change
                </TabsTrigger>
              </TabsList>

              <div className="grid gap-4">
                <TabsContent value="welcome">
                  <Card>
                    <CardHeader>
                      <CardTitle>Welcome to Career Compass</CardTitle>
                      <CardDescription>
                        Your AI-powered career guidance companion. Let's start your journey to success.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                          <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                            <feature.icon className="w-8 h-8 text-blue-600 mb-2" />
                            <h3 className="font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {feature.description}
                            </p>
                          </Card>
                        ))}
                      </div>
                      <div className="flex justify-center gap-4 mt-6">
                        <Button onClick={() => setShowLogin(true)}>
                          <UserIcon className="w-4 h-4 mr-2" />
                          Create Profile
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab('assessment')}>
                          Start Assessment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="assessment">
                  <Card>
                    <CardHeader>
                      <CardTitle>Career Assessment</CardTitle>
                      <CardDescription>
                        Let's discover your skills, interests, and ideal career path.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={progress} className="mb-4" />
                      <ChatInterface
                        onProgress={setProgress}
                        type="assessment"
                        className="h-[400px]"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Similar TabsContent components for other tabs */}
              </div>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}

const features = [
  {
    title: 'Personalized Assessment',
    description: 'Discover your ideal career path through our comprehensive skills and interests analysis.',
    icon: GraduationCapIcon,
  },
  {
    title: 'Job Matching',
    description: 'Get matched with opportunities that align with your skills and career goals.',
    icon: BriefcaseIcon,
  },
  {
    title: 'Resume Builder',
    description: 'Create a professional resume with our AI-powered templates and real-time feedback.',
    icon: FileTextIcon,
  },
  {
    title: 'Interview Prep',
    description: 'Practice with our AI interviewer and get instant feedback to improve your skills.',
    icon: UserIcon,
  },
  {
    title: 'Career Change',
    description: 'Explore new career paths and get guidance on transitioning to a new industry.',
    icon: RefreshCwIcon,
  },
  {
    title: 'Expert Guidance',
    description: '24/7 access to AI-powered career advice and professional development resources.',
    icon: MessageSquareIcon,
  },
];