import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Grid } from "@material-ui/core";
import React from "react";
import Fade from "react-reveal/Fade";

import projects from "../data/projects";
import { colors } from "../theme";
import LinkIconBar from "./LinkIconBar";
import Tech from "./Tech";

const Card = ({ name, description, links }) => {
  const bg = useColorModeValue(colors.bg.light, colors.bg.dark);

  return (
    <Box
      bgColor={bg}
      borderRadius="lg"
      borderWidth={bg === colors.bg.light ? "1px" : ""}
      rounded="md"
      shadow="lg"
      mt={0}
      m="auto"
      mb={3}
      w="75%"
    >
      <Heading as="h1" size="md" m={2} p={2} pt={6}>
        {name}
      </Heading>
      <Text m={2} p={2} pb={6}>
        {description}
      </Text>
      <LinkIconBar links={links} float="right" mt={0} mr={4} mb={4} />
    </Box>
  );
};

const ProjectContent = ({ alternate, name, description, pic, tech, links }) => {
  if (alternate) {
    return (
      <>
        <Card name={name} description={description} links={links} />
        <Grid container direction="row" justify="center" spacing={2}>
          <Tech tech={tech} />
        </Grid>
      </>
    );
  }
  return (
    <Image
      m="auto"
      w="85%"
      p="auto"
      src={pic}
      alt={`${name} picture`}
      className="image"
    />
  );
};

const Project = ({ index, shouldAlternate, ...props }) => (
  <Fade>
    <Grid container direction="row" style={{ height: "80vh" }}>
      <Grid container item xs={12} sm={6}>
        <ProjectContent
          alternate={shouldAlternate ? index % 2 === 0 : true}
          {...props}
        />
      </Grid>
      <Grid container item xs={12} sm={6}>
        <ProjectContent
          alternate={shouldAlternate ? index % 2 === 1 : false}
          {...props}
        />
      </Grid>
    </Grid>
  </Fade>
);

export default function ProjectsOverview() {
  const shouldAlternate = useBreakpointValue({ base: false, md: true });
  return (
    <Flex pt={12}>
      <Grid container direction="column" justify="center">
        {projects.map((project, index) => (
          <Project
            key={project.name}
            index={index}
            shouldAlternate={shouldAlternate}
            {...project}
          />
        ))}
      </Grid>
    </Flex>
  );
}