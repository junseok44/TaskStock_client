import React from "react";
import ContentLayout from "../../atoms/ContentLayout";
import ProjectList from "../../organisms/Project/ProjectList";
import { useProject } from "../../../hooks/useProject";
import Margin from "../../atoms/Margin";
import { View } from "react-native";

export default function ProjectScreenFirst() {
  const { projects, isError, isLoading } = useProject();
  return (
    <>
      <ContentLayout noHorizontalPadding noVerticalPadding>
        <ProjectList
          projects={projects}
          isLoading={isLoading}
          isError={isError}
        ></ProjectList>
      </ContentLayout>
    </>
  );
}
