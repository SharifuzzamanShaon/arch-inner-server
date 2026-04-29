import {
  addMemberService,
  deleteMemberService,
  getAllMemberService,
  getMemberByIdService,
  updateMemberService,
} from "../../services/team.service.js";
import error from "../../utils/error.js";
import { socialLinksParser } from "../../utils/parseSocialLink.js";

const addMember = async (req, res, next) => {
  try {
    const { name, designation, speach, socialLinks } = req.body;
    const image = req.file?.filename
      ? `${process.env.HOST_URL}/assets/${req.file?.filename}`
      : "";
    const newMember = await addMemberService({
      name,
      designation,
      speach,
      image,
      socialLinks,
    });
    res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: newMember,
    });
  } catch (error) {
    next(error);
  }
};
const getAllMember = async (req, res, next) => {
  try {
    const allMembers = await getAllMemberService();
    // make all-members.soclialLinks to object from string  "{email:\"ajs@gmail.com\", linkedin:\"als.linkedin\"}"

    const members = allMembers.map((member) => ({
      ...member,
      socialLinks: socialLinksParser(member.socialLinks),
    }));

    res.status(200).json({
      success: true,
      message: "Members fetched successfully",
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

const getMemberById = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    let member = await getMemberByIdService(memberId);
    if (!member) throw error("No member found", 404);
    member.socialLinks = socialLinksParser(member.socialLinks);
    res.status(200).json({
      success: true,
      message: "Member fetched successfully",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const { name, designation, speach, socialLinks } = req.body;
    const isMemberExist = await getMemberByIdService(memberId);
    if (!isMemberExist) throw error("Member not found", 404);
    const image = req.file?.filename
      ? `${process.env.HOST_URL}/assets/${req.file?.filename}`
      : isMemberExist.image;

    const memberDto = {
      name: name ?? isMemberExist.name,
      designation: designation ?? isMemberExist.designation,
      image: image ?? isMemberExist.image,
      speach: speach ?? isMemberExist.speach,
      socialLinks: socialLinks ?? isMemberExist.socialLinks,
    };
    const updatedMember = await updateMemberService(memberId, memberDto);
    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: updatedMember,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const isMemberExist = await getMemberByIdService(memberId);
    if (!isMemberExist) {
      throw error("Member not found", 404);
    }
    await deleteMemberService(memberId);
    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { addMember, deleteMember, getAllMember, getMemberById, updateMember };
