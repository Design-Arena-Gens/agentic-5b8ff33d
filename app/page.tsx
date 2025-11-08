'use client'

import { useState } from 'react'
import { Calendar, BarChart3, MessageSquare, CheckCircle, Clock, AlertCircle, Users, TrendingUp, Share2, FileText, Image, Video, Send, Eye, ThumbsUp, MessageCircle, Repeat2, Plus, Edit, Trash2, Play } from 'lucide-react'
import { format, addDays } from 'date-fns'

type Platform = 'facebook' | 'instagram' | 'twitter' | 'linkedin'
type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed'
type WorkflowStage = 'content-creation' | 'review' | 'approval' | 'scheduling' | 'published' | 'analytics'

interface Post {
  id: string
  content: string
  platforms: Platform[]
  status: PostStatus
  scheduledDate?: Date
  publishedDate?: Date
  images: string[]
  workflowStage: WorkflowStage
  approver?: string
  analytics?: {
    views: number
    likes: number
    comments: number
    shares: number
  }
}

interface ContentIdea {
  id: string
  title: string
  category: string
  priority: 'high' | 'medium' | 'low'
  suggested: boolean
}

export default function SocialMediaManager() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'calendar' | 'analytics' | 'workflow'>('dashboard')
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: 'Join us for our Health Awareness Campaign! Learn about preventive care and wellness tips from our experts. #BharatLifeCare #HealthFirst',
      platforms: ['facebook', 'instagram', 'twitter'],
      status: 'scheduled',
      scheduledDate: addDays(new Date(), 1),
      images: ['health-campaign.jpg'],
      workflowStage: 'scheduling',
    },
    {
      id: '2',
      content: 'Our team of dedicated doctors and nurses are here to serve you 24/7. Your health is our priority! 🏥',
      platforms: ['instagram', 'facebook'],
      status: 'published',
      publishedDate: addDays(new Date(), -2),
      images: ['team-photo.jpg'],
      workflowStage: 'analytics',
      analytics: {
        views: 15420,
        likes: 1243,
        comments: 87,
        shares: 156,
      },
    },
    {
      id: '3',
      content: 'Tips for maintaining a healthy lifestyle during monsoon season. Stay safe and healthy! 🌧️',
      platforms: ['twitter', 'linkedin'],
      status: 'draft',
      images: [],
      workflowStage: 'content-creation',
    },
  ])

  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([
    { id: '1', title: 'Mental Health Awareness Week', category: 'Health Education', priority: 'high', suggested: true },
    { id: '2', title: 'Patient Success Stories', category: 'Testimonials', priority: 'medium', suggested: true },
    { id: '3', title: 'New Medical Technology Announcement', category: 'Updates', priority: 'high', suggested: false },
    { id: '4', title: 'Vaccination Drive Information', category: 'Public Health', priority: 'high', suggested: true },
  ])

  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [newPost, setNewPost] = useState<Partial<Post>>({
    content: '',
    platforms: [],
    status: 'draft',
    images: [],
    workflowStage: 'content-creation',
  })

  const workflowStages: { stage: WorkflowStage; label: string; icon: any }[] = [
    { stage: 'content-creation', label: 'Content Creation', icon: FileText },
    { stage: 'review', label: 'Review', icon: Eye },
    { stage: 'approval', label: 'Approval', icon: CheckCircle },
    { stage: 'scheduling', label: 'Scheduling', icon: Calendar },
    { stage: 'published', label: 'Published', icon: Send },
    { stage: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const handleCreatePost = () => {
    if (!newPost.content || !newPost.platforms || newPost.platforms.length === 0) {
      alert('Please fill in content and select at least one platform')
      return
    }

    const post: Post = {
      id: Date.now().toString(),
      content: newPost.content || '',
      platforms: newPost.platforms || [],
      status: 'draft',
      images: newPost.images || [],
      workflowStage: 'content-creation',
    }

    setPosts([post, ...posts])
    setShowNewPostModal(false)
    setNewPost({
      content: '',
      platforms: [],
      status: 'draft',
      images: [],
      workflowStage: 'content-creation',
    })
  }

  const handleMoveWorkflowStage = (postId: string, newStage: WorkflowStage) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        let newStatus = post.status
        if (newStage === 'scheduling') {
          newStatus = 'scheduled'
        } else if (newStage === 'published') {
          newStatus = 'published'
        }
        return { ...post, workflowStage: newStage, status: newStatus }
      }
      return post
    }))
  }

  const getPlatformIcon = (platform: Platform) => {
    const icons = {
      facebook: '📘',
      instagram: '📷',
      twitter: '🐦',
      linkedin: '💼',
    }
    return icons[platform]
  }

  const getStatusColor = (status: PostStatus) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-700',
      scheduled: 'bg-blue-100 text-blue-700',
      published: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
    }
    return colors[status]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-lg">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bharat Life Care</h1>
                <p className="text-sm text-gray-500">Social Media Manager AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">12 Posts Scheduled</p>
                <p className="text-xs text-gray-500">Next post in 3 hours</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'content', label: 'Content', icon: FileText },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'workflow', label: 'Workflow', icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Posts', value: '247', change: '+12%', icon: FileText, color: 'blue' },
                { label: 'Engagement Rate', value: '8.4%', change: '+2.3%', icon: TrendingUp, color: 'green' },
                { label: 'Scheduled', value: '12', change: '3 today', icon: Clock, color: 'yellow' },
                { label: 'Platforms', value: '4', change: 'Active', icon: Share2, color: 'purple' },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                      <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggestions */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                  AI Content Suggestions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentIdeas.filter(idea => idea.suggested).map((idea) => (
                  <div key={idea.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{idea.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{idea.category}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        idea.priority === 'high' ? 'bg-red-100 text-red-700' :
                        idea.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {idea.priority}
                      </span>
                    </div>
                    <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Create Post
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {posts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                        <div className="flex space-x-1">
                          {post.platforms.map((platform) => (
                            <span key={platform} className="text-sm">{getPlatformIcon(platform)}</span>
                          ))}
                        </div>
                        {post.scheduledDate && (
                          <span className="text-xs text-gray-500">
                            {format(post.scheduledDate, 'MMM dd, HH:mm')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content View */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
              <button
                onClick={() => setShowNewPostModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Post</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {['draft', 'scheduled', 'published'].map((statusFilter) => (
                <div key={statusFilter} className="space-y-4">
                  <h3 className="font-semibold text-gray-900 capitalize flex items-center">
                    {statusFilter === 'draft' && <FileText className="h-4 w-4 mr-2" />}
                    {statusFilter === 'scheduled' && <Clock className="h-4 w-4 mr-2" />}
                    {statusFilter === 'published' && <CheckCircle className="h-4 w-4 mr-2" />}
                    {statusFilter} ({posts.filter(p => p.status === statusFilter).length})
                  </h3>
                  {posts.filter(p => p.status === statusFilter).map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                      <p className="text-sm text-gray-900 mb-3 line-clamp-3">{post.content}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex space-x-1">
                          {post.platforms.map((platform) => (
                            <span key={platform} className="text-lg">{getPlatformIcon(platform)}</span>
                          ))}
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                      </div>
                      {post.scheduledDate && (
                        <p className="text-xs text-gray-500 mb-3">
                          📅 {format(post.scheduledDate, 'MMM dd, yyyy HH:mm')}
                        </p>
                      )}
                      {post.analytics && (
                        <div className="grid grid-cols-4 gap-2 text-center border-t border-gray-200 pt-3">
                          <div>
                            <Eye className="h-3 w-3 mx-auto text-gray-400" />
                            <p className="text-xs font-medium text-gray-900">{post.analytics.views}</p>
                          </div>
                          <div>
                            <ThumbsUp className="h-3 w-3 mx-auto text-gray-400" />
                            <p className="text-xs font-medium text-gray-900">{post.analytics.likes}</p>
                          </div>
                          <div>
                            <MessageCircle className="h-3 w-3 mx-auto text-gray-400" />
                            <p className="text-xs font-medium text-gray-900">{post.analytics.comments}</p>
                          </div>
                          <div>
                            <Repeat2 className="h-3 w-3 mx-auto text-gray-400" />
                            <p className="text-xs font-medium text-gray-900">{post.analytics.shares}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex space-x-2 mt-3">
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-xs font-medium hover:bg-gray-200 transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-xs font-medium hover:bg-gray-200 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Content Calendar</h2>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="grid grid-cols-7 gap-4 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-semibold text-gray-700">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = addDays(new Date(), i - 15)
                  const dayPosts = posts.filter(post =>
                    post.scheduledDate &&
                    format(post.scheduledDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                  )

                  return (
                    <div
                      key={i}
                      className={`border rounded-lg p-2 min-h-24 ${
                        format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {format(date, 'd')}
                      </div>
                      {dayPosts.map((post) => (
                        <div key={post.id} className="bg-blue-100 rounded px-2 py-1 text-xs text-blue-800 mb-1 truncate">
                          {format(post.scheduledDate!, 'HH:mm')}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Reach', value: '124.5K', trend: '+18%', color: 'blue' },
                { label: 'Engagement Rate', value: '8.4%', trend: '+2.3%', color: 'green' },
                { label: 'Total Interactions', value: '10.2K', trend: '+25%', color: 'purple' },
              ].map((metric, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.trend} vs last month</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Performance</h3>
              <div className="space-y-4">
                {[
                  { platform: 'Facebook', posts: 42, engagement: '9.2%', reach: '45K', color: 'blue' },
                  { platform: 'Instagram', posts: 38, engagement: '12.1%', reach: '52K', color: 'pink' },
                  { platform: 'Twitter', posts: 51, engagement: '5.8%', reach: '18K', color: 'cyan' },
                  { platform: 'LinkedIn', posts: 24, engagement: '7.3%', reach: '9.5K', color: 'indigo' },
                ].map((platform) => (
                  <div key={platform.platform} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{platform.platform}</h4>
                      <span className="text-sm text-gray-500">{platform.posts} posts</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Engagement Rate</p>
                        <p className="text-lg font-bold text-gray-900">{platform.engagement}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Reach</p>
                        <p className="text-lg font-bold text-gray-900">{platform.reach}</p>
                      </div>
                    </div>
                    <div className="mt-3 bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-${platform.color}-600 h-2 rounded-full`}
                        style={{ width: platform.engagement }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Posts</h3>
              <div className="space-y-4">
                {posts.filter(p => p.analytics).map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-900 mb-3">{post.content}</p>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <Eye className="h-4 w-4 mx-auto text-gray-400 mb-1" />
                        <p className="text-sm font-bold text-gray-900">{post.analytics?.views.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Views</p>
                      </div>
                      <div>
                        <ThumbsUp className="h-4 w-4 mx-auto text-gray-400 mb-1" />
                        <p className="text-sm font-bold text-gray-900">{post.analytics?.likes.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Likes</p>
                      </div>
                      <div>
                        <MessageCircle className="h-4 w-4 mx-auto text-gray-400 mb-1" />
                        <p className="text-sm font-bold text-gray-900">{post.analytics?.comments.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Comments</p>
                      </div>
                      <div>
                        <Repeat2 className="h-4 w-4 mx-auto text-gray-400 mb-1" />
                        <p className="text-sm font-bold text-gray-900">{post.analytics?.shares.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Shares</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workflow View */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Content Workflow Management</h2>
              <div className="text-sm text-gray-500">
                End-to-end process tracking
              </div>
            </div>

            {/* Workflow Pipeline */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 overflow-x-auto">
              <div className="flex space-x-4 min-w-max pb-4">
                {workflowStages.map((stage, index) => (
                  <div key={stage.stage} className="flex-1 min-w-64">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <stage.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                        <p className="text-xs text-gray-500">
                          {posts.filter(p => p.workflowStage === stage.stage).length} posts
                        </p>
                      </div>
                      {index < workflowStages.length - 1 && (
                        <div className="ml-4 text-gray-300">→</div>
                      )}
                    </div>
                    <div className="space-y-3">
                      {posts.filter(p => p.workflowStage === stage.stage).map((post) => (
                        <div key={post.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                          <p className="text-xs text-gray-900 mb-2 line-clamp-2">{post.content}</p>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex space-x-1">
                              {post.platforms.map((platform) => (
                                <span key={platform} className="text-sm">{getPlatformIcon(platform)}</span>
                              ))}
                            </div>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                              {post.status}
                            </span>
                          </div>
                          {index < workflowStages.length - 1 && (
                            <button
                              onClick={() => handleMoveWorkflowStage(post.id, workflowStages[index + 1].stage)}
                              className="w-full bg-blue-600 text-white py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                            >
                              <Play className="h-3 w-3" />
                              <span>Move to {workflowStages[index + 1].label}</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Workflow Efficiency</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Creation Time</span>
                    <span className="text-sm font-bold text-gray-900">2.5 hrs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Approval Time</span>
                    <span className="text-sm font-bold text-gray-900">4 hrs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Cycle Time</span>
                    <span className="text-sm font-bold text-gray-900">1.2 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Team Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Content Creators</span>
                    <span className="text-sm font-bold text-gray-900">3 active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Approvers</span>
                    <span className="text-sm font-bold text-gray-900">2 active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Posts This Week</span>
                    <span className="text-sm font-bold text-gray-900">18 posts</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">AI Automation</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Auto-Scheduled</span>
                    <span className="text-sm font-bold text-green-600">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Suggestions Used</span>
                    <span className="text-sm font-bold text-green-600">67%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Time Saved</span>
                    <span className="text-sm font-bold text-green-600">~15 hrs/week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  rows={6}
                  placeholder="Write your post content here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['facebook', 'instagram', 'twitter', 'linkedin'] as Platform[]).map((platform) => (
                    <button
                      key={platform}
                      onClick={() => {
                        const platforms = newPost.platforms || []
                        if (platforms.includes(platform)) {
                          setNewPost({
                            ...newPost,
                            platforms: platforms.filter(p => p !== platform)
                          })
                        } else {
                          setNewPost({
                            ...newPost,
                            platforms: [...platforms, platform]
                          })
                        }
                      }}
                      className={`p-3 border-2 rounded-lg font-medium transition-colors ${
                        newPost.platforms?.includes(platform)
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <span className="mr-2">{getPlatformIcon(platform)}</span>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
