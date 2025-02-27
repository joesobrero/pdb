"use client";

import { cn } from "@/app/lib/utils";
import Input from "@/app/components/interactive/input";
import Select from "@/app/components/interactive/select";
import {
  faCalendarDays,
  faCommentDots,
  faLink,
  faBan,
  faPlus,
  faTags,
  faArrowsUpDown,
  faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { useState, useEffect } from "react";
import Badge from "@/app/components/interactive/badge";

const NewBriefPage = () => {
  // Basic brief info
  const [briefName, setBriefName] = useState("");
  const [isNameValid, setIsNameValid] = useState<boolean | undefined>(
    undefined
  );

  // Customization options
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState("");
  const [length, setLength] = useState<string>("concise");
  const [frequency, setFrequency] = useState<string>("weekly");
  const [tone, setTone] = useState<string>("professional");
  const [sources, setSources] = useState<string[]>([]);
  const [newSource, setNewSource] = useState("");
  const [restrictedSources, setRestrictedSources] = useState<string[]>([]);
  const [newRestrictedSource, setNewRestrictedSource] = useState("");
  const [targetAudience, setTargetAudience] = useState("");

  // Template prompt
  const [templatePrompt, setTemplatePrompt] = useState("");

  // Select options
  const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
  ];

  const lengthOptions = [
    { value: "concise", label: "Concise" },
    { value: "high-level", label: "High-level" },
    { value: "detailed", label: "Detailed" },
    { value: "comprehensive", label: "Comprehensive" },
    { value: "exhaustive", label: "Exhaustive" },
  ];

  const toneOptions = [
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "neutral", label: "Neutral" },
    { value: "professional", label: "Professional" },
    { value: "authoritative", label: "Authoritative" },
  ];

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
    const toneText = `[${tone}]`;
    const frequencyText = `[${frequency}]`;
    const lengthText = `[${length}]`;

    // Format the prompt with highlighted variables - using a single line with explicit line breaks
    setTemplatePrompt(
      `Write a ${frequencyText} newsletter aimed at ${targetAudienceText} that covers ${topicsString} in a ${toneText} manner. Start with a brief, engaging introduction, ` +
        `then dive into key points or sections with actionable insights and analysis. ` +
        `Include relevant data or quotes from sources like ${sourcesString} and avoid sources like ${restrictedSourcesString} ` +
        `and provide clear examples, statistics, and inforgraphics where appropriate. ` +
        `Conclude with a compelling concise summary. ` +
        `Ensure the overall content is ${lengthText}.`
    );
  }, [
    topics,
    length,
    frequency,
    tone,
    sources,
    restrictedSources,
    targetAudience,
  ]);

  return (
    <>
      <h1 className="text-3xl font-display font-bold">New brief</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-2 w-96">
          <h6 className="font-medium">Settings</h6>

          {/* Brief Name */}
          <Input
            type="text"
            value={briefName}
            onChange={handleNameChange}
            placeholder="Title"
            isValid={isNameValid === true}
            isInvalid={isNameValid === false}
            errorMessage={
              isNameValid === false
                ? "Name must be at least 3 characters"
                : undefined
            }
          />

          {/* Frequency */}
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            options={frequencyOptions}
            leftIcon={faCalendarDays}
          />

          {/* Target Audience */}
          <Input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Target audience"
            leftIcon={faUserGroup}
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
              autoComplete="new-password"
            />
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {topics.map((topic, index) => (
                  <Badge
                    key={index}
                    label={topic}
                    onRemove={() => removeTopic(topic)}
                    variant="solid"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Tone */}
          <Select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            options={toneOptions}
            leftIcon={faCommentDots}
          />

          {/* Length */}
          <Select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            options={lengthOptions}
            leftIcon={faArrowsUpDown}
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
              autoComplete="new-password"
            />
            {sources.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {sources.map((source, index) => (
                  <Badge
                    key={index}
                    label={source}
                    onRemove={() => removeSource(source)}
                    variant="subtle"
                  />
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
              autoComplete="new-password"
            />
            {restrictedSources.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {restrictedSources.map((source, index) => (
                  <Badge
                    key={index}
                    label={source}
                    onRemove={() => removeRestrictedSource(source)}
                    variant="destructive"
                  />
                ))}
              </div>
            )}
          </div>
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
                    "inline tracking-wide",
                    isVariable
                      ? "text-content font-medium"
                      : "text-muted font-light"
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
