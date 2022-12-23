import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [resources, setResources] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    try {
      const [imagesResponse, videosResponse] = await Promise.all([
        fetch("/api/files/?type=image", {
          method: "GET",
        }),
        fetch("/api/files/?type=video", {
          method: "GET",
        }),
      ]);

      const [imagesData, videosData] = await Promise.all([
        imagesResponse.json(),
        videosResponse.json(),
      ]);

      let allResources = [];

      if (imagesResponse.status >= 200 && imagesResponse.status < 300) {
        allResources = [...allResources, ...imagesData.result.resources];
      } else {
        throw data;
      }

      if (videosResponse.status >= 200 && videosResponse.status < 300) {
        allResources = [...allResources, ...videosData.result.resources];
      } else {
        throw data;
      }

      setResources(allResources);
    } catch (error) {
      // TODO: Show error message to user
      console.error(error);
    }
  };

  const handleDownloadResource = async (resourceUrl, assetId, format) => {
    try {
      setLoading(true);
      const response = await fetch(resourceUrl, {});

      if (response.status >= 200 && response.status < 300) {
        const blob = await response.blob();

        const fileUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = `${assetId}.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
      }

      throw await response.json();
    } catch (error) {
      // TODO: Show error message to user
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (id, type) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/files/?id=${id}&type=${type}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status >= 200 && response.status < 300) {
        return refresh();
      }

      throw data;
    } catch (error) {
      // TODO: Show error message to user
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <nav>
        <h1>Meme Generator</h1>
        <div>
          <Link href="/">

            Home

          </Link>

          <Link href="/upload">

            Upload Photo/Video

          </Link>
        </div>
      </nav>
      {resources.length} Resources Uploaded
      <div className="resources-wrapper">
        {resources.map((resource, index) => {
          const isVideo = resource.resource_type === "video";

          let resourceUrl = resource.secure_url;

          if (isVideo) {
            resourceUrl = resource.secure_url.replace(".mp4", ".gif");
          }

          return (
            <div className="resource-wrapper" key={index}>
              <div className="resource">
                <Image
                  className="image"
                  src={resourceUrl}
                  layout="responsive"
                  alt={resourceUrl}
                  width={resource.width}
                  height={resource.height}
                ></Image>
              </div>
              <div className="actions">
                <button
                  disabled={loading}
                  onClick={() => {
                    handleDownloadResource(
                      resourceUrl,
                      resource.asset_id,
                      isVideo ? "gif" : resource.format
                    );
                  }}
                >
                  Download
                </button>
                <button
                  disabled={loading}
                  onClick={() => {
                    handleDeleteResource(
                      resource.public_id,
                      isVideo ? "video" : "image"
                    );
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}