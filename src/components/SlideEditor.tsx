import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generatePresentation } from "../lib/gemini";
import { generatePptx, downloadPptx } from "../lib/pptx";
import { Presentation, PromptInput, promptSchema } from "../types/ppt";

export const SlideEditor = () => {
  const [currentPresentation, setCurrentPresentation] =
    useState<Presentation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [model, setModel] = useState("2.5 Flash");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PromptInput>({
    resolver: zodResolver(promptSchema),
    defaultValues: { prompt: "" },
  });

  const userPrompt = watch("prompt");

  const onSubmit = async (data: PromptInput) => {
    if (!userPrompt?.trim()) return;
    setIsLoading(true);

    try {
      const newPresentation = await generatePresentation(
        data.prompt,
        currentPresentation,
        selectedFiles.length > 0 ? selectedFiles : undefined,
        model
      );

      setCurrentPresentation(newPresentation);
      reset({ prompt: "" });
      setSelectedFiles([]);
    } catch (error) {
      alert("Error generating slides. Check console.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        alert(`Skipped ${file.name}: Only images allowed.`);
        continue;
      }
      if (file.size > 30 * 1024 * 1024) {
        alert(`Skipped ${file.name}: Max 30MB.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 5) {
      alert("Max 5 images allowed.");
      validFiles.splice(5);
    }

    setSelectedFiles(validFiles);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePreview = (file: File) => {
    setPreviewFile(file);
    setShowPreview(true);
  };

  const handleRandomTopic = () => {
    const topics = [
      "The Future of AI in Education",
      "Sustainable Energy Solutions",
      "Remote Work Best Practices",
      "Climate Change Impacts",
      "Blockchain Beyond Crypto",
    ];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    reset({ prompt: topic });
  };

  const handleDownload = () => {
    if (!currentPresentation) return;
    try {
      const pptx = generatePptx(currentPresentation);
      downloadPptx(
        pptx,
        `${
          currentPresentation.title.replace(/\s/g, "_") || "Presentation"
        }.pptx`
      );
    } catch (e) {
      alert("Failed to generate PPTX.");
      console.error(e);
    }
  };

  return (
    <div className="bg-white flex flex-col h-screen">
      <div className="flex flex-col grow overflow-hidden md:flex-row">
        <div className="relative bg-zinc-50 flex flex-col w-full z-10">
          <div className="flex-shrink-0 flex justify-between items-center bg-white px-6 py-4 border-b border-gray-200 md:bg-transparent">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <img
                  src="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-13.svg"
                  alt="Back"
                  className="h-5 w-5"
                />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">
                AI Slides (
                {currentPresentation
                  ? `${currentPresentation.slides.length} slides`
                  : "New"}
                )
              </h1>
              {currentPresentation && (
                <button
                  onClick={handleDownload}
                  className="ml-4 flex items-center h-9 px-3 py-0 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-slate-900"
                  disabled={isLoading}
                >
                  Download PPTX
                </button>
              )}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto pt-6 px-6">
            <div className="max-w-2xl mx-auto md:max-w-4xl">
              {currentPresentation && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Slide Outline Preview
                  </h3>
                  <div className="space-y-4 p-4 border rounded-lg bg-white shadow">
                    {currentPresentation.slides.map((slide, index) => (
                      <div
                        key={index}
                        className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r"
                      >
                        <p className="text-xs text-gray-600">
                          Slide {index + 1}
                        </p>
                        <h4 className="font-semibold text-gray-900">
                          {slide.title}
                        </h4>
                        <ul className="list-disc ml-5 text-sm text-gray-700 mt-1">
                          {(Array.isArray(slide.content)
                            ? slide.content
                            : slide.content
                            ? [slide.content]
                            : []
                          ).map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 pb-2 px-6">
            <div className="max-w-2xl mx-auto md:max-w-4xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.ctrlKey &&
                    !e.metaKey
                  )
                    return;
                  if (
                    e.key === "Enter" &&
                    (e.ctrlKey || e.metaKey || e.shiftKey)
                  ) {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }
                }}
              >
                <div>
                  <div className="relative bg-white shadow-lg border-2 border-gray-200 rounded-2xl p-3">
                    {selectedFiles.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {selectedFiles.map((file, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs"
                          >
                            <button
                              onClick={() => handlePreview(file)}
                              className="underline hover:no-underline"
                            >
                              {file.name.slice(0, 8)}...
                            </button>
                            <button
                              onClick={() => removeFile(i)}
                              className="text-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <textarea
                      {...register("prompt")}
                      autoFocus
                      placeholder={
                        currentPresentation
                          ? "Edit slide 2: change title to 'New Title' or 'Add chart about sales'..."
                          : "Start with a topic, we'll turn it into slides! (e.g., The Future of Remote Work)"
                      }
                      className={`w-full pt-5 pb-3 px-5 text-sm text-gray-900 bg-transparent resize-none min-h-[100px] max-h-60 focus:outline-none rounded-t-2xl ${
                        errors.prompt ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {errors.prompt && (
                      <p className="text-red-500 text-xs px-5 pt-1">
                        {errors.prompt.message}
                      </p>
                    )}

                    <div className="flex justify-between items-center px-5 py-3.5 border-t border-gray-100 rounded-b-2xl">
                      <div className="flex items-center gap-2 flex-1">
                        <label className="cursor-pointer p-2 border border-gray-200 rounded-lg hover:bg-gray-100">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={isLoading}
                          />
                          <img
                            src="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-14.svg"
                            alt="Upload"
                            className="h-5 w-5"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={handleRandomTopic}
                          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100"
                          disabled={isLoading}
                        >
                          <img
                            src="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-15.svg"
                            alt="Random"
                            className="h-5 w-5"
                          />
                        </button>

                        <div className="relative group">
                          <button
                            type="button"
                            className="text-xs flex items-center gap-1 border border-gray-200 px-2 py-1 rounded hover:bg-gray-100"
                          >
                            {model}{" "}
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block bg-white border rounded shadow w-32">
                            {["2.5 Flash", "1.5 Pro"].map((m) => (
                              <button
                                key={m}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModel(m);
                                }}
                                className={`block w-full text-left px-2 py-1 text-xs ${
                                  model === m ? "bg-blue-100" : ""
                                }`}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="w-24 h-[54px] border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300"
                          disabled={isLoading}
                        >
                          <img
                            src="https://c.animaapp.com/mh7f6r12BRiEQe/assets/1.jpg"
                            alt="Template"
                            className="w-full h-full object-cover"
                          />
                        </button>

                        <button
                          type="submit"
                          disabled={isLoading || !userPrompt?.trim()}
                          className={`flex items-center h-10 px-4 py-2 text-sm font-medium text-white rounded-lg ${
                            isLoading || !userPrompt?.trim()
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-stone-950 hover:bg-black"
                          }`}
                        >
                          {isLoading ? (
                            <svg
                              className="animate-spin h-5 w-5 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          ) : (
                            <img
                              src="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-16.svg"
                              alt="Generate"
                              className="h-5 w-5 mr-1"
                            />
                          )}
                          {currentPresentation
                            ? "Edit Slides"
                            : "Generate Slides"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showPreview && previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full max-h-full overflow-auto">
            <img
              src={URL.createObjectURL(previewFile)}
              alt="Preview"
              className="max-w-full max-h-96 mx-auto"
            />
            <button
              onClick={() => {
                setShowPreview(false);
                setPreviewFile(null);
              }}
              className="mt-3 block mx-auto text-red-600 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
