"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FileText, LoaderCircle, Upload, Pencil } from "lucide-react";
import { VscEdit, VscSave } from "react-icons/vsc";
import { usePortfolio, type PortfolioAboutData } from "@/features/portfolio";

function DataField({
	label,
	value,
	className = "",
	customValue,
}: {
	label: string;
	value?: string;
	className?: string;
	customValue?: React.ReactNode;
}) {
	return (
		<div className={`flex flex-col gap-1.5 ${className}`}>
			<span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
				{label}
			</span>
			{customValue ? (
				customValue
			) : (
				<span className="text-base font-medium" style={{ color: "var(--text-primary)" }}>
					{value}
				</span>
			)}
		</div>
	);
}

export default function PortfolioPage() {
	const { getAboutData } = usePortfolio();
	const [aboutData, setAboutData] = useState<PortfolioAboutData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [aboutError, setAboutError] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [description, setDescription] = useState("");
	const [cvName, setCvName] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const imageInputRef = useRef<HTMLInputElement>(null);
	const cvInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		let isMounted = true;

		getAboutData()
			.then((data) => {
				if (!isMounted) return;

				setAboutData(data);
				setDescription(data.description ?? "");
				setImageSrc(data.image_url ?? data.image_path ?? "");
				setCvName(data.cv_url?.split("/").pop() ?? data.cv_path?.split("/").pop() ?? "");
				setIsLoading(false);
			})
			.catch((error: unknown) => {
				if (!isMounted) return;

				setAboutError(error instanceof Error ? error.message : "Failed to load about data");
				setIsLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, [getAboutData]);

	if (isLoading) {
		return (
			<div>
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">About Me</h1>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage the information that will be displayed on your portfolio&apos;s about page.</p>
				</div>
				<div className="flex min-h-64 w-full max-w-5xl items-center justify-center rounded-2xl shadow-sm" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
					<div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
						<LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
						<span>Loading about data...</span>
					</div>
				</div>
			</div>
		);
	}

	if (aboutError) {
		return (
			<div>
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">About Me</h1>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage the information that will be displayed on your portfolio&apos;s about page.</p>
				</div>
				<div className="w-full max-w-5xl rounded-2xl p-6 shadow-sm" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
					<p className="text-sm text-red-500">Failed to load about data: {aboutError}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
						About Me
					</h1>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
						Manage the information that will be displayed on your portfolio&apos;s about page.
					</p>
				</div>
			</div>

			<div className="w-full max-w-5xl">
				<div className="overflow-hidden rounded-2xl shadow-sm" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
					<div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)", background: "var(--thead-bg)" }}>
						<h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
							About Data
						</h2>
						<button
							type="button"
							onClick={() => setIsEditing((value) => !value)}
							className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition"
							style={{ background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }}
						>
							{isEditing ?
							 	<VscSave className="text-base" /> : <VscEdit className="text-base" />
							}
							<span>{isEditing ? "Save Data" : "Edit Data"}</span>
						</button>
					</div>

					<div className="p-6 md:p-8">
						<div className="flex flex-col gap-10 md:flex-row">
							<div className="flex shrink-0 flex-col gap-3">
								<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Profile Picture 
								</span>
								<div
									className="relative flex h-48 w-48 items-center justify-center overflow-visible rounded-2xl py-1.5 shadow-sm"
									style={{ border: "1px solid var(--border)", background: "var(--surface-hover)" }}
									>
									{isEditing && (
										<button
										type="button"
										onClick={() => imageInputRef.current?.click()}
										className="absolute -left-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
										aria-label="Upload profile picture"
										>
										<Pencil className="text-white" size={12} strokeWidth={2.5} />
										</button>
									)}

									<input
										ref={imageInputRef}
										type="file"
										accept="image/*"
										className="hidden"
										onChange={(event) => {
										const file = event.target.files?.[0];
										if (file) setImageSrc(URL.createObjectURL(file));
										}}
									/>

									{imageSrc && (
										<Image fill src={imageSrc} alt="Profile illustration" className="h-full w-full object-contain p-2" />
									)}
								</div>
							</div>

							<div className="flex grow flex-col gap-4">
								<div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
									<DataField
										label="Description"
										customValue={isEditing ? (
											<textarea
												value={description}
												onChange={(event) => setDescription(event.target.value)}
												className="min-h-32 w-full resize-y rounded-lg p-3 text-sm outline-none"
												style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
											/>
										) : description}
										className="sm:col-span-2 leading-relaxed"
									/>
									<DataField
										label="CV / Resume"
										customValue={
											<div
												className="flex items-center gap-3 rounded-xl p-3"
												style={{ background: "var(--thead-bg)", border: "1px solid var(--border)" }}
											>
												<div
													className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
													style={{ background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }}
												>
													<FileText className="h-5 w-5" />
												</div>
												<div className="min-w-0 flex-1">
													<p className="truncate text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
														{aboutData?.cv_url ? <a href={aboutData.cv_url} target="_blank" rel="noreferrer" className="hover:underline">{cvName}</a> : cvName}
													</p>
													<p className="text-xs" style={{ color: "var(--text-secondary)" }}>
														PDF document · Ready to display
													</p>
												</div>
													{isEditing && <button
													type="button"
													onClick={() => cvInputRef.current?.click()}
													className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:hidden"
													style={{ color: "var(--nav-active-text)", background: "var(--nav-active-bg)" }}
													>
														<Upload className="h-3.5 w-3.5" />
														<span className="hidden sm:inline">Upload</span>
													</button>}
													<input
														ref={cvInputRef}
														type="file"
														accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
														className="hidden"
														onChange={(event) => {
															const file = event.target.files?.[0];
															if (file) setCvName(file.name);
														}}
													/>
											</div>
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
