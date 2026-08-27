"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { VscEdit, VscSave } from "react-icons/vsc";
import { usePortfolio, type PortfolioHomeData } from "@/features/portfolio";

const inputStyle = {
	background: "var(--input-bg)",
	border: "1px solid var(--input-border)",
	color: "var(--text-primary)",
};

function DataField({ label, value, className = "", customValue }: { label: string; value?: string; className?: string; customValue?: React.ReactNode }) {
	return (
		<div className={`flex flex-col gap-1.5 ${className}`}>
			<span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{label}</span>
			{customValue ?? <span className="text-base font-medium" style={{ color: "var(--text-primary)" }}>{value}</span>}
		</div>
	);
}

function TextInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
	return <input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />;
}

function ShortUrl({ value }: { value: string }) {
	const shortValue = (() => {
		try {
			const url = new URL(value.match(/^https?:\/\//) ? value : `https://${value}`);
			return `${url.hostname}${url.pathname.replace(/\/$/, "")}`;
		} catch {
			return value;
		}
	})();

	return (
		<a href={value} target="_blank" rel="noreferrer" title={value} className="block max-w-full truncate text-sm font-medium hover:underline" style={{ color: "var(--text-primary)" }}>
			{shortValue}
		</a>
	);
}

function PortfolioRawList({ data }: { data: unknown }) {
	if (data === null || typeof data !== "object") {
		return <li className="break-all">{String(data)}</li>;
	}

	return Object.entries(data as Record<string, unknown>).map(([key, value]) => (
		<li key={key} className="break-all">
			<span className="font-semibold">{key}:</span>{" "}
			{typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)}
		</li>
	));
}

export default function PortfolioHomePage() {
	const { getHomeData, getAboutData } = usePortfolio();
	const [portfolioData, setPortfolioData] = useState<unknown>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [portfolioError, setPortfolioError] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [greeting, setGreeting] = useState("Hello, I'm");
	const [name, setName] = useState("Brian Yudhistira");
	const [passions, setPassions] = useState([
		"Fullstack Developer",
		"Frontend Developer",
		"Backend Developer",
	]);
	const [description, setDescription] = useState("");
	const [linkedin, setLinkedin] = useState("");
	const [github, setGithub] = useState("");
	const [instagram, setInstagram] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const imageInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		let isMounted = true;

		getHomeData()
			.then((data) => {
				if (!isMounted) return;

				setPortfolioData(data);
				const homeData: PortfolioHomeData = data;

				if (homeData.greeting !== undefined) setGreeting(homeData.greeting);
				if (homeData.name !== undefined) setName(homeData.name);
				if (homeData.passions !== undefined) setPassions(homeData.passions);
				if (homeData.description !== undefined) setDescription(homeData.description);
				if (homeData.logo_url !== undefined) setImageSrc(homeData.logo_url);
				if (homeData.social_media_links?.github !== undefined) setGithub(homeData.social_media_links.github);
				if (homeData.social_media_links?.linkedin !== undefined) setLinkedin(homeData.social_media_links.linkedin);
				if (homeData.social_media_links?.instagram !== undefined) setInstagram(homeData.social_media_links.instagram);
				setIsLoading(false);
			})
			.catch((error: unknown) => {
				if (!isMounted) return;

				setPortfolioError(error instanceof Error ? error.message : "Failed to load home data");
				setIsLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, [getHomeData]);

	const updatePassion = (index: number, value: string) => {
		setPassions((current) => current.map((passion, passionIndex) => passionIndex === index ? value : passion));
	};

	if (isLoading) {
		return (
			<div>
				<div className="mb-8">
					<h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Home Portfolio</h1>
					<p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Manage the main data that will be displayed on your portfolio homepage.</p>
				</div>
				<div className="flex min-h-64 w-full max-w-5xl items-center justify-center rounded-2xl shadow-sm" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
					<div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
						<LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
						<span>Loading home data...</span>
					</div>
				</div>
			</div>
		);
	}

	if (portfolioError) {
		return (
			<div>
				<div className="mb-8">
					<h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Home Portfolio</h1>
					<p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Manage the main data that will be displayed on your portfolio homepage.</p>
				</div>
				<div className="w-full max-w-5xl rounded-2xl p-6 shadow-sm" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
					<p className="text-sm text-red-500">Failed to load home data: {portfolioError}</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="mb-8">
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Home Portfolio</h1>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Manage the main data that will be displayed on your portfolio homepage.</p>
            </div>
			<div className="w-full max-w-5xl">
				<div className="overflow-hidden rounded-2xl shadow-sm" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
					<div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)", background: "var(--thead-bg)" }}>
						<h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Home Data</h2>
						<button type="button" onClick={() => setIsEditing((value) => !value)} className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition" style={{ background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }}>
							{isEditing ? <VscSave /> : <VscEdit />}<span>{isEditing ? "Save Data" : "Edit Data"}</span>
						</button>
					</div>
					<div className="p-6 md:p-8">
                        <div className="flex flex-col gap-10 md:flex-row">
						<div className="flex shrink-0 flex-col gap-3">
                            <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Hero Image / Illustration</span>
							<div className="relative flex h-48 w-48 py-1.5 items-center justify-center overflow-visible rounded-2xl shadow-sm" style={{ border: "1px solid var(--border)", background: "var(--surface-hover)" }}>
								{isEditing && 
                                <button type="button" onClick={() => imageInputRef.current?.click()} className="absolute -left-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 hover:bg-red-600" aria-label="Upload hero image">
                                    <Pencil className="text-white" size={12} />
                                </button>}
								<input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) setImageSrc(URL.createObjectURL(file)); }} />
								{imageSrc && 
									<Image fill src={imageSrc} alt="Hero illustration" className="h-full w-full object-contain p-2" />
								}
							</div>
						</div>
						<div className="flex grow flex-col gap-4">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                <DataField label="Greeting" customValue={isEditing ? <TextInput value={greeting} onChange={setGreeting} /> : greeting} />
                                <DataField label="Name" customValue={isEditing ? <TextInput value={name} onChange={setName} /> : name} />
                                <DataField
                                    label="Passions (Typing Effect)"
                                    className="sm:col-span-2"
                                    customValue={isEditing ? (
                                        <div className="flex flex-col gap-2">
                                            {passions.map((passion, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <TextInput value={passion} onChange={(value) => updatePassion(index, value)} />
                                                    <button type="button" onClick={() => setPassions((current) => current.filter((_, passionIndex) => passionIndex !== index))} className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50" aria-label={`Remove passion ${index + 1}`}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => setPassions((current) => [...current, ""])} className="flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: "var(--thead-bg)", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
                                                <Plus className="h-4 w-4" /> Add Passion
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {passions.filter(Boolean).map((passion) => 
                                                <span key={passion} className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                                                    {passion}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                />
                                <DataField label="Description" className="sm:col-span-2" 
                                    customValue={isEditing ? 
                                        <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-32 w-full resize-y rounded-lg p-3 text-sm outline-none" style={inputStyle} /> : description
                                    } 
                                />
                            </div>
							<div className="h-px w-full" style={{ background: "var(--border)" }} />
                                <div>
                                    <h3 className="mb-4 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Social Media Links</h3>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
										<DataField label="LinkedIn" customValue={isEditing ? <TextInput value={linkedin} onChange={setLinkedin} /> : <ShortUrl value={linkedin} />} />
										<DataField label="Github" customValue={isEditing ? <TextInput value={github} onChange={setGithub} /> : <ShortUrl value={github} />} />
										<DataField label="Instagram" customValue={isEditing ? <TextInput value={instagram} onChange={setInstagram} /> : <ShortUrl value={instagram} />} />
                                    </div>
                                </div>
						    </div>
					    </div>
					</div>
				</div>
			</div>
			{process.env.NODE_ENV === "development" && (
				<div className="mt-8 w-full max-w-5xl rounded-2xl p-6 shadow-sm" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
					<h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Portfolio Data (Development)</h2>
					{portfolioError ? (
						<p className="mt-3 text-sm text-red-500">{portfolioError}</p>
					) : portfolioData === null ? (
						<p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>Loading...</p>
					) : (
						<ul className="mt-3 list-inside list-disc space-y-1 font-mono text-sm" style={{ color: "var(--text-primary)" }}>
							<PortfolioRawList data={portfolioData} />
						</ul>
					)}
				</div>
			)}
		</div>
	);
}
