import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
  },
  // created by chatgpt
  isBase64Image =  (imageData: string) => {
    const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/; // Regular expressions for image validations
    return base64Regex.test(imageData);
  },
  // created by chatgpt
  formatDateString = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);

    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    return `${time} - ${formattedDate}`;
  },
  // created by chatgpt
  formatThreadCount = (count: number): string => {
    if (count === 0) {
      return "No Threads";
    } else {
      const threadCount = count.toString().padStart(2, "0");
      const threadWord = count === 1 ? "Thread" : "Threads";
      return `${threadCount} ${threadWord}`;
    }
  };

export { cn, isBase64Image, formatDateString, formatThreadCount };
