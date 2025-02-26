"use client";

import { cn } from "@/app/lib/utils";
import Input from "@/app/components/interactive/Input";
import {
  faUser,
  faCalendarDays,
  faCommentDots,
  faLink,
  faBan,
  faChevronDown,
  faPlus,
  faTimes,
  faTags,
  faAnglesUpDown,
  faArrowsUpDown,
} from "@fortawesome/pro-regular-svg-icons";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewBriefPage = () => {
  // Basic brief info
  const [briefName, setBriefName] = useState("");
  const [isNameValid, setIsNameValid] = useState<boolean | undefined>(
    undefined
  );

  // Customization options
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState("");
  const [length, setLength] = useState<string>("medium");
  const [frequency, setFrequency] = useState<string>("weekly");
  const [tone, setTone] = useState<string>("professional");
  const [sources, setSources] = useState<string[]>(["cnn.com"]);
  const [newSource, setNewSource] = useState("");
  const [restrictedSources, setRestrictedSources] = useState<string[]>([]);
  const [newRestrictedSource, setNewRestrictedSource] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandGuidelines, setBrandGuidelines] = useState("");

  // Advanced options toggle
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Template prompt
  const [templatePrompt, setTemplatePrompt] = useState("");

  // Handle name validation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBriefName(value);

    // Simple validation example - name must be at least 3 characters
    if (value.length > 0) {
      setIsNameValid(value.length >= 3);
    } else {
      setIsNameValid(undefined);
    }
  };

  // Add a new topic
  const addTopic = () => {
    if (newTopic && !topics.includes(newTopic)) {
      setTopics([...topics, newTopic]);
      setNewTopic("");
    }
  };

  // Remove a topic
  const removeTopic = (topicToRemove: string) => {
    setTopics(topics.filter((topic) => topic !== topicToRemove));
  };

  // Add a new source
  const addSource = () => {
    if (newSource && !sources.includes(newSource)) {
      setSources([...sources, newSource]);
      setNewSource("");
    }
  };

  // Remove a source
  const removeSource = (sourceToRemove: string) => {
    setSources(sources.filter((source) => source !== sourceToRemove));
  };

  // Add a new restricted source
  const addRestrictedSource = () => {
    if (
      newRestrictedSource &&
      !restrictedSources.includes(newRestrictedSource)
    ) {
      setRestrictedSources([...restrictedSources, newRestrictedSource]);
      setNewRestrictedSource("");
    }
  };

  // Remove a restricted source
  const removeRestrictedSource = (sourceToRemove: string) => {
    setRestrictedSources(
      restrictedSources.filter((source) => source !== sourceToRemove)
    );
  };

  // Update template prompt when customization options change
  useEffect(() => {
    const topicsString =
      topics.length > 0 ? `[${topics.join(", ")}]` : "[topics]";
    const sourcesString =
      sources.length > 0 ? `[${sources.join(", ")}]` : "[acceptable sources]";
    const restrictedSourcesString =
      restrictedSources.length > 0
        ? `[${restrictedSources.join(", ")}]`
        : "[restricted sources]";
    const targetAudienceText = targetAudience
      ? `[${targetAudience}]`
      : "[target audience]";
    const brandGuidelinesText = brandGuidelines
      ? `[${brandGuidelines}]`
      : "[brand guidelines or personality]";
    const toneText = `[${tone}]`;
    const frequencyText = `[${frequency}]`;
    const lengthText = `[${length}/detail level]`;

    // Format the prompt with highlighted variables - using a single line with explicit line breaks
    setTemplatePrompt(
      `Write a ${frequencyText} newsletter aimed at ${targetAudienceText} that covers ${topicsString} in a ${toneText} manner. Start with a brief, engaging introduction, ` +
        `then dive into key points or sections with actionable insights and analysis. ` +
        `Include relevant data or quotes from sources like ${sourcesString} and avoid sources like ${restrictedSourcesString} ` +
        `and provide clear examples, statistics, and inforgraphics where appropriate. ` +
        `Conclude with a compelling concise summary. ` +
        `Ensure the overall content is ${lengthText} and aligns with our brand voice: ${brandGuidelinesText}`
    );
  }, [
    topics,
    length,
    frequency,
    tone,
    sources,
    restrictedSources,
    targetAudience,
    brandGuidelines,
  ]);

  return (
    <>
      <h1 className="text-3xl font-display font-bold">New brief</h1>

      <div className="flex flex-row gap-18 mt-6">
        <div className="flex flex-col gap-2 w-96">
          <h6 className="font-medium">Settings</h6>

          {/* Brief Name */}
          <Input
            type="text"
            value={briefName}
            onChange={handleNameChange}
            placeholder="Name"
            // leftIcon={faUser}
            isValid={isNameValid === true}
            isInvalid={isNameValid === false}
            errorMessage={
              isNameValid === false
                ? "Name must be at least 3 characters"
                : undefined
            }
          />

          {/* Frequency */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted">
              <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-base-200 rounded-lg appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 border"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted">
              <FontAwesomeIcon icon={faAnglesUpDown} />
            </div>
          </div>

          {/* Target Audience */}
          <Input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Target audience"
            leftIcon={faUser}
          />

          {/* Topics */}
          <div className="relative">
            <Input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Topics"
              leftIcon={faTags}
              onKeyDown={(e) => e.key === "Enter" && addTopic()}
              rightIcon={faPlus}
              rightIconAction={addTopic}
              rightIconLabel="Add topic"
            />
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-base-200 px-3 py-1 rounded-full"
                  >
                    <span>{topic}</span>
                    <button
                      onClick={() => removeTopic(topic)}
                      className="text-muted hover:text-content transition-colors"
                      aria-label={`Remove ${topic}`}
                    >
                      <FontAwesomeIcon icon={faTimes} size="sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tone */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted">
              <FontAwesomeIcon icon={faCommentDots} />
            </div>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-base-200 rounded-lg appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 border"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="conversational">Conversational</option>
              <option value="authoritative">Authoritative</option>
              <option value="technical">Technical</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted">
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>

          {/* Length */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted">
              <FontAwesomeIcon icon={faArrowsUpDown} />
            </div>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-base-200 rounded-lg appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 border"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted">
              <FontAwesomeIcon icon={faAnglesUpDown} />
            </div>
          </div>

          {/* Advanced Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            Advanced
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform ${
                showAdvanced ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="space-y-4 animate-fade-in">
              {/* Brand Guidelines */}
              <Input
                type="text"
                value={brandGuidelines}
                onChange={(e) => setBrandGuidelines(e.target.value)}
                placeholder="Brand guidelines or personality"
                leftIcon={faUser}
              />

              {/* Sources */}
              <div className="relative">
                <Input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="Sources"
                  leftIcon={faLink}
                  onKeyDown={(e) => e.key === "Enter" && addSource()}
                  rightIcon={faPlus}
                  rightIconAction={addSource}
                  rightIconLabel="Add source"
                />
                {sources.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sources.map((source, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-base-200 px-3 py-1 rounded-full"
                      >
                        <span>{source}</span>
                        <button
                          onClick={() => removeSource(source)}
                          className="text-muted hover:text-content transition-colors"
                          aria-label={`Remove ${source}`}
                        >
                          <FontAwesomeIcon icon={faTimes} size="sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Restricted Sources */}
              <div className="relative">
                <Input
                  type="text"
                  value={newRestrictedSource}
                  onChange={(e) => setNewRestrictedSource(e.target.value)}
                  placeholder="Restricted sources"
                  leftIcon={faBan}
                  onKeyDown={(e) => e.key === "Enter" && addRestrictedSource()}
                  rightIcon={faPlus}
                  rightIconAction={addRestrictedSource}
                  rightIconLabel="Add restricted source"
                />
                {restrictedSources.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {restrictedSources.map((source, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-base-200 px-3 py-1 rounded-full"
                      >
                        <span>{source}</span>
                        <button
                          onClick={() => removeRestrictedSource(source)}
                          className="text-muted hover:text-content transition-colors"
                          aria-label={`Remove ${source}`}
                        >
                          <FontAwesomeIcon icon={faTimes} size="sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <h6 className="font-medium">Prompt</h6>
          <div
            className={cn(
              "w-full p-6 rounded-lg border bg-base-200",
              "min-h-[200px] whitespace-pre-line"
            )}
          >
            {templatePrompt.split(/(\[[^\]]+\])/).map((part, index) => {
              // Check if the part is a variable (enclosed in square brackets)
              const isVariable = /^\[[^\]]+\]$/.test(part);
              return (
                <span
                  key={index}
                  className={cn(
                    "inline",
                    isVariable ? "text-content font-bold" : "text-muted"
                  )}
                >
                  {part}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBriefPage;
