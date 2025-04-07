type Props = {
    title: string;
    image: string;
    summary: string;
  };
  
  export default function BlogCard({ title, image, summary }: Props) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm">{summary}</p>
        </div>
      </div>
    );
  }
  