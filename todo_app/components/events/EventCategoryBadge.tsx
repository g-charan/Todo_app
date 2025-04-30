"use client";

type Category = "BIRTHDAY" | "MEETING" | "TASK" | "REMINDER" | string;

interface EventCategoryBadgeProps {
  category: Category;
}

const categoryStyles: Record<
  Category,
  { bg: string; text: string; label: string }
> = {
  BIRTHDAY: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "BIRTHDAY",
  },
  MEETING: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "MEETING",
  },
  TASK: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    label: "TASK",
  },
  REMINDER: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    label: "REMINDER",
  },
  default: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    label: "EVENT",
  },
};

export default function EventCategoryBadge({
  category,
}: EventCategoryBadgeProps) {
  const style = categoryStyles[category] || categoryStyles.default;

  return (
    <div
      className={`${style.bg} ${style.text} px-3 py-1 rounded-lg text-xs font-medium`}
    >
      {style.label}
    </div>
  );
}
