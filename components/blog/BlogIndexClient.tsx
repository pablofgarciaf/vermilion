'use client';

import React, { useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { BLOG_POSTS } from '@/data/blogData';
import { getLocalizedText } from '@/utils/i18nHelper';
import type { BlogPost } from '@/data/blogData';

export function BlogIndexClient({ hideHeader }: { hideHeader?: boolean }) {
  const t = useTranslations();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Memoize the categories list
  const categories = useMemo(() => {
    const cats = new Set<string>();
    BLOG_POSTS.forEach((post) => {
      if (post.category) {
        cats.add(post.category);
      }
    });
    return Array.from(cats).sort();
  }, []);

  // Memoize the featured post
  const featuredPost = useMemo(() => BLOG_POSTS[0] || null, []);

  // Memoize filtered posts
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) {
      return BLOG_POSTS.slice(1); // Exclude featured post from list
    }
    return BLOG_POSTS.slice(1).filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const handlePostClick = useCallback((slug: string, locale: string) => {
    router.push(`/${locale}/blog/${slug}`);
  }, [router]);

  const handleSubscribe = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscriptionStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Subscription failed');
      }

      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    } catch (error) {
      setSubscriptionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    }
  }, [email]);

  if (!featuredPost) {
    return <div className="text-center py-12">{t('noBlogPosts')}</div>;
  }

  const locale = 'en'; // This should be passed as a prop in real usage

  return (
    <div className="space-y-12">
      {/* Featured Post Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">{t('featuredArticle') || 'Featured Article'}</h2>
        <div
          className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-lg"
          onClick={() => handlePostClick(featuredPost.slug, locale)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Featured Image */}
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={featuredPost.imageUrl}
                alt={getLocalizedText(featuredPost.title, locale)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Featured Content */}
            <div className="flex flex-col justify-center space-y-3">
              {featuredPost.category && (
                <div className="inline-flex w-max px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  {featuredPost.category}
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {getLocalizedText(featuredPost.title, locale)}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {getLocalizedText(featuredPost.excerpt, locale)}
              </p>
              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <span>{featuredPost.author.name}</span>
                <span>•</span>
                <span>{new Date(featuredPost.publishedAt).toLocaleDateString(locale)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">{t('categories') || 'Categories'}</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            {t('all') || 'All'}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
          {selectedCategory ? `${selectedCategory} Articles` : t('allArticles') || 'All Articles'}
        </h2>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
            {t('noArticles') || 'No articles found in this category.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col"
                onClick={() => handlePostClick(post.slug, locale)}
              >
                {/* Post Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={post.imageUrl}
                    alt={getLocalizedText(post.title, locale)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Post Content */}
                <div className="p-4 flex flex-col flex-grow space-y-2">
                  {post.category && (
                    <div className="inline-flex w-max px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </div>
                  )}
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {getLocalizedText(post.title, locale)}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 flex-grow">
                    {getLocalizedText(post.excerpt, locale)}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <span>{post.author.name}</span>
                    <span>•</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString(locale)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Subscription CTA */}
      <section className="relative rounded-3xl overflow-hidden py-12 px-6 md:px-12 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t('stayUpdated') || 'Stay Updated'}
          </h2>
          <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
            {t('subscribeNewsletter') || 'Get the latest travel guides, expedition tips, and wildlife insights delivered to your inbox.'}
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-6">
            <input
              type="email"
              placeholder={t('enterYourEmail') || 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={subscriptionStatus === 'loading'}
              className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-200 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={subscriptionStatus === 'loading'}
              className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-xl hover:bg-zinc-100 disabled:opacity-50 transition-colors whitespace-nowrap text-xs"
            >
              {subscriptionStatus === 'loading' ? t('subscribing') || 'Subscribing...' : t('subscribe') || 'Subscribe'}
            </button>
          </form>

          {subscriptionStatus === 'success' && (
            <p className="text-emerald-100 text-sm">{t('subscriptionSuccess') || 'Thank you for subscribing!'}</p>
          )}
          {subscriptionStatus === 'error' && (
            <p className="text-red-200 text-sm">{errorMessage || t('subscriptionError') || 'An error occurred. Please try again.'}</p>
          )}
        </div>
      </section>
    </div>
  );
}
